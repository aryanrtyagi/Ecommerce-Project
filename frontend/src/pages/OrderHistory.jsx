import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../utils/auth";

function OrderHistory() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await authFetch(`${BASEURL}/api/orders/`);
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [BASEURL]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-neutral-500">Loading your orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-black">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-2xl font-semibold text-black mb-6">Order History</h1>

                {orders.length === 0 ? (
                    <div className="bg-white border border-neutral-200 p-10 text-center">
                        <p className="text-neutral-600 mb-4">You haven't placed any orders yet.</p>
                        <Link to="/products" className="text-black underline underline-offset-2 font-medium">
                            Start Shopping →
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-neutral-200 p-6">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-neutral-100">
                                    <div>
                                        <p className="font-semibold text-black">Order #{order.id}</p>
                                        <p className="text-sm text-neutral-500">
                                            {new Date(order.created_at).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <span className="border border-neutral-300 text-neutral-600 text-xs font-semibold uppercase tracking-wide px-3 py-1">
                                        {order.payment_method}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-14 h-14 object-cover border border-neutral-200"
                                            />
                                            <div className="flex-1">
                                                <p className="text-black font-medium text-sm">{item.product_name}</p>
                                                <p className="text-sm text-neutral-500">
                                                    Qty: {item.quantity} × ₹{item.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                                    <p className="text-sm text-neutral-500">
                                        Shipped to: {order.address}
                                    </p>
                                    <p className="font-mono-price text-lg font-semibold text-black">
                                        ₹{order.total_amount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;