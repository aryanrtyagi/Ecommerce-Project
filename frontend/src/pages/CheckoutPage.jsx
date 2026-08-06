import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { authFetch } from "../utils/auth";
import toast from "react-hot-toast";

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { cartItems, total, fetchCart } = useCart();

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
                toast.success("Order placed successfully");
                setTimeout(() => navigate("/"), 1500);
            } else {
                toast.error(data.error || "Order failed. Try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

                {/* Left — Form */}
                <div className="bg-white border border-neutral-200 p-8">
                    <h1 className="font-display text-2xl font-semibold text-black mb-6">
                        Checkout
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none text-black transition-colors"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                                Delivery Address
                            </label>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="House No, Street, City, State, Pincode"
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none text-black resize-none transition-colors"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                required
                                className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none text-black transition-colors"
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                                Payment Method
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: "COD", label: "Cash on Delivery" },
                                    { value: "ONLINE", label: "Online Payment" },
                                    { value: "PAYPAL", label: "PayPal" },
                                    { value: "CARD", label: "Card" },
                                ].map((method) => (
                                    <label
                                        key={method.value}
                                        className={`flex items-center gap-2 border px-4 py-3 cursor-pointer transition ${
                                            form.payment_method === method.value
                                                ? "border-black bg-black text-white font-medium"
                                                : "border-neutral-300 text-neutral-600 hover:border-black"
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
                                        <span className="text-sm">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-neutral-800 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* Right — Order Summary */}
                <div className="bg-white border border-neutral-200 p-8 h-fit">
                    <h2 className="font-display text-xl font-semibold text-black mb-5">
                        Order Summary
                    </h2>

                    {/* Items */}
                    <div className="flex flex-col gap-4 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <img
                                    src={item.product_image || "https://via.placeholder.com/60"}
                                    alt={item.product_name}
                                    className="w-14 h-14 object-cover border border-neutral-200"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black truncate">
                                        {item.product_name}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-mono-price text-sm font-semibold text-black">
                                    ₹{(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-neutral-200 pt-4 flex flex-col gap-2 text-sm text-neutral-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
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
                        <div className="flex justify-between items-center border-t border-neutral-200 pt-3 mt-2">
                            <span className="text-lg font-semibold text-black">Total</span>
                            <span className="font-mono-price text-xl font-semibold text-black">
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