import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-6">
                <span className="text-6xl">○</span>
                <h2 className="font-display text-2xl font-semibold text-black">Your cart is empty</h2>
                <p className="text-neutral-500">Looks like you haven't added anything yet.</p>
                <Link
                    to="/products"
                    className="mt-4 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-white px-4 pb-12">
            <h1 className="font-display text-3xl font-semibold mb-8 text-center text-black">
                Your Cart
            </h1>

            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                {/* Cart Items */}
                <div className="bg-white border border-neutral-200 p-6 flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-neutral-100 pb-5 last:border-none last:pb-0"
                        >
                            {/* Image */}
                            <img
                                src={item.product_image || "https://via.placeholder.com/100"}
                                alt={item.product_name}
                                className="w-24 h-24 object-cover border border-neutral-200"
                            />

                            {/* Info */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h2 className="text-base font-semibold text-black">
                                        {item.product_name}
                                    </h2>
                                    <p className="font-mono-price text-black font-semibold text-base">
                                        ₹{(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <p className="text-neutral-400 text-sm mb-3">
                                    ₹{parseFloat(item.product_price).toFixed(2)} each
                                </p>

                                {/* Quantity + Remove */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 border border-neutral-300 hover:border-black font-medium text-lg transition flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="font-medium text-black w-5 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 border border-neutral-300 hover:border-black font-medium text-lg transition flex items-center justify-center"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-4 text-sm text-neutral-500 hover:text-black underline underline-offset-2 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white border border-neutral-200 p-6">
                    <h2 className="font-display text-xl font-semibold text-black mb-4">Order Summary</h2>

                    <div className="flex flex-col gap-2 text-neutral-600 text-sm mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
                            <span className="font-mono-price">₹{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (18% GST)</span>
                            <span className="font-mono-price">₹{(total * 0.18).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-neutral-200 pt-4 flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-black">Total</h3>
                        <p className="font-mono-price text-2xl font-semibold text-black">
                            ₹{(total * 1.18).toFixed(2)}
                        </p>
                    </div>

                    <Link
                        to="/checkout"
                        className="block w-full text-center bg-black text-white py-3 text-sm font-medium hover:bg-neutral-800 transition"
                    >
                        Proceed to Checkout →
                    </Link>

                    <Link
                        to="/products"
                        className="block w-full text-center mt-3 text-sm text-neutral-500 hover:text-black transition"
                    >
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;