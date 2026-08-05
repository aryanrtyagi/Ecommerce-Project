import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";
import toast from "react-hot-toast";

function Profile() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({ username: "", email: "", phone: "", address: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await authFetch(`${BASEURL}/api/profile/`);
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setForm({
                    username: data.username || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                });
            } catch {
                toast.error("Could not load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [BASEURL]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await authFetch(`${BASEURL}/api/profile/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                }),
            });
            if (!res.ok) throw new Error("Failed to update profile");
            toast.success("Profile updated");
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 My Profile</h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={form.username}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="mt-2 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;