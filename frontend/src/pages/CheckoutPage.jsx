import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { authFetch } from "../utils/auth";
import toast from "react-hot-toast";

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { cartItems, total, clearCart, fetchCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authFetch(`${BASEURL}/api/order/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                await fetchCart();
                toast.success("Order placed successfully! 🎉");
                setTimeout(() => navigate("/"), 1500);
            } else {
                toast.error(data.error || "Order failed. Try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const paymentIcons = {
        COD: "💵",
        ONLINE: "🌐",
        PAYPAL: "🅿️",
        CARD: "💳",
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

                {/* Left — Form */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        🧾 Checkout
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-600">
                                Delivery Address
                            </label>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="House No, Street, City, State, Pincode"
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 resize-none"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-600">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter Contact No:"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600">
                                Payment Method
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: "COD", label: "Cash on Delivery", icon: "💵" },
                                    { value: "ONLINE", label: "Online Payment", icon: "🌐" },
                                    { value: "PAYPAL", label: "PayPal", icon: "🅿️" },
                                    { value: "CARD", label: "Card", icon: "💳" },
                                ].map((method) => (
                                    <label
                                        key={method.value}
                                        className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition ${
                                            form.payment_method === method.value
                                                ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                                                : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value={method.value}
                                            checked={form.payment_method === method.value}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span>{method.icon}</span>
                                        <span className="text-sm">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Placing Order..." : "Place Order 🎉"}
                        </button>
                    </form>
                </div>

                {/* Right — Order Summary */}
                <div className="bg-white rounded-2xl shadow-md p-8 h-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-5">
                        Order Summary
                    </h2>

                    {/* Items */}
                    <div className="flex flex-col gap-4 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <img
                                    src={item.product_image || "https://via.placeholder.com/60"}
                                    alt={item.product_name}
                                    className="w-14 h-14 object-cover rounded-lg "
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                        {item.product_name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="text-sm font-bold text-indigo-600">
                                    ₹{(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
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
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                            <span className="text-lg font-bold text-gray-800">Total</span>
                            <span className="text-xl font-bold text-indigo-600">
                                ₹{(total * 1.18).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;