import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { authFetch } from "../utils/auth";

function CheckoutPage() {
    const BASEURL = 'http://127.0.0.1:8000';
    const navigate = useNavigate();
    const { fetchCart,clearCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // setLoading(true);
        // setMessage(null);

        try{
            const res = await authFetch(`${BASEURL}/api/order/create/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if(res.ok){
                await fetchCart();
                setMessage("Order Placed Successfully!!");
                setTimeout(()=>{
                    navigate("/")
                },1200);
            } else{
                setMessage(data.error || "Order Failed");
            }
        } catch(error){
            console.error("Checkout error:", error);
            setMessage("Something went wrong");
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">CheckOut</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="w-full p-2 border rounded"
                    />

                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className="w-full p-2 border roounded"
                    >
                        <option value="COD"> Cash on Delivery</option>
                        <option value="ONLINE"> Online Payment</option>
                        <option value="PAYPAL">Paypal</option>
                        <option value="CARD">Card</option>
                    </select>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded"
                    >
                        {loading ? "Processing..." : "PlaceOrder"}
                    </button>
                    {message && (
                        <p className="text-center text-green-700 font-semibold mt-4">{message}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CheckoutPage