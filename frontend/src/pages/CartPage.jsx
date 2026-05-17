import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
                <span className="text-7xl">🛒</span>
                <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
                <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                <Link
                    to="/products"
                    className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-100 px-4 pb-12">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                🛒 Your Cart
            </h1>

            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                {/* Cart Items */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-gray-100 pb-5 last:border-none last:pb-0"
                        >
                            {/* Image */}
                            <img
                                src={item.product_image || "https://via.placeholder.com/100"}
                                alt={item.product_name}
                                className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                            />

                            {/* Info */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {item.product_name}
                                    </h2>
                                    <p className="text-indigo-600 font-bold text-lg">
                                        ₹{(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <p className="text-gray-400 text-sm mb-3">
                                    ₹{parseFloat(item.product_price).toFixed(2)} each
                                </p>

                                {/* Quantity + Remove */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-lg border border-gray-300 font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="font-semibold text-gray-800 w-5 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-lg border border-gray-300 font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-4 text-sm text-red-500 hover:text-red-700 font-medium transition"
                                    >
                                        🗑 Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                    <div className="flex flex-col gap-2 text-gray-600 text-sm mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-500 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (18% GST)</span>
                            <span>₹{(total * 0.18).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Total</h3>
                        <p className="text-2xl font-bold text-indigo-600">
                            ₹{(total * 1.18).toFixed(2)}
                        </p>
                    </div>

                    <Link
                        to="/checkout"
                        className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition"
                    >
                        Proceed to Checkout →
                    </Link>

                    <Link
                        to="/products"
                        className="block w-full text-center mt-3 text-sm text-gray-500 hover:text-indigo-600 transition"
                    >
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;