import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Login() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({ username: "", password: "" })
    const [msg, setMsg] = useState("");
    const nav = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg("");
        try {
            const res = await fetch(`${BASE}/api/token/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                saveToken(data);
                setMsg("Login successful");
                setTimeout(() => nav("/"), 800);
            } else {
                setMsg(data.detail || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            setMsg("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white">
            <div className="max-w-md w-full border border-neutral-200 p-8">
                <h2 className="font-display text-2xl font-semibold text-black mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="username" onChange={handleChange} value={form.username} placeholder="Username" required className="w-full p-3 border border-neutral-300 focus:border-black outline-none text-sm transition-colors" />
                    <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" required className="w-full p-3 border border-neutral-300 focus:border-black outline-none text-sm transition-colors" />
                    <button className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-neutral-800 transition">Login</button>
                </form>
                {msg && <p className="mt-4 text-sm text-neutral-600">{msg}</p>}
                <div className="mt-5 text-sm text-neutral-500">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-black font-medium hover:underline">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login;