import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function WishList() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">❤️ My Wishlist</h1>

                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
                        <Link to="/products" className="text-indigo-600 hover:underline font-medium">
                            Browse Products →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
                            >
                                <Link to={`/product/${item.product.id}`}>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                                        {item.product.name}
                                    </h2>
                                </Link>
                                <p className="text-xl font-bold text-indigo-600 mb-3">
                                    ₹{item.product.price}
                                </p>

                                <div className="flex items-center gap-2 mt-auto">
                                    <button
                                        onClick={() => addToCart(item.product.id)}
                                        className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                                    >
                                        🛒 Add to Cart
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.product.id)}
                                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-300 transition text-sm"
                                        aria-label="Remove from wishlist"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;