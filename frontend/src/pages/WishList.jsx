import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="min-h-screen bg-white pt-24 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="font-display text-2xl font-semibold text-black mb-6">My Wishlist</h1>

                {wishlistItems.length === 0 ? (
                    <div className="bg-white border border-neutral-200 p-10 text-center">
                        <p className="text-neutral-600 mb-4">Your wishlist is empty.</p>
                        <Link to="/products" className="text-black underline underline-offset-2 font-medium">
                            Browse Products →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white border border-neutral-200 hover:border-black transition-colors p-4 flex flex-col"
                            >
                                <Link to={`/product/${item.product.id}`}>
                                    <div className="overflow-hidden mb-4">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <h2 className="font-display text-base font-semibold text-black mb-1">
                                        {item.product.name}
                                    </h2>
                                </Link>
                                <p className="font-mono-price text-lg font-semibold text-black mb-3">
                                    ₹{item.product.price}
                                </p>

                                <div className="flex items-center gap-2 mt-auto">
                                    <button
                                        onClick={() => addToCart(item.product.id)}
                                        className="flex-1 bg-black text-white px-3 py-2 text-sm font-medium hover:bg-neutral-800 transition"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.product.id)}
                                        className="px-3 py-2 border border-neutral-300 text-neutral-500 hover:border-black hover:text-black transition text-sm"
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