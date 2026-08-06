import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

function Profile() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const { fetchProfile } = useUser();

    const [form, setForm] = useState({ username: "", email: "", phone: "", address: "" });
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
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
                setPreview(data.profile_picture || null);
            } catch {
                toast.error("Could not load profile");
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [BASEURL]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }
        setPicture(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("address", form.address);
            if (picture) formData.append("profile_picture", picture);

            const res = await authFetch(`${BASEURL}/api/profile/`, {
                method: "PUT",
                body: formData,
            });
            if (!res.ok) throw new Error("Failed to update profile");
            toast.success("Profile updated");
            setPicture(null);
            await fetchProfile();
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const initial = form.username ? form.username.charAt(0).toUpperCase() : "?";

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-neutral-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 p-6">
            <div className="max-w-lg mx-auto">
                <h1 className="font-display text-2xl font-semibold text-black mb-6">My Profile</h1>

                <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-8 flex flex-col gap-5">

                    {/* Profile picture */}
                    <div className="flex items-center gap-4">
                        <span className="w-16 h-16 rounded-full border border-black overflow-hidden flex items-center justify-center text-xl font-semibold bg-black text-white shrink-0">
                            {preview ? (
                                <img src={preview} alt={form.username} className="w-full h-full object-cover" />
                            ) : (
                                initial
                            )}
                        </span>
                        <div>
                            <label className="inline-block text-sm font-medium text-black border border-black px-4 py-2 cursor-pointer hover:bg-black hover:text-white transition">
                                Change photo
                                <input type="file" accept="image/*" onChange={handlePictureChange} className="hidden" />
                            </label>
                            <p className="text-xs text-neutral-400 mt-1.5">PNG, JPG — max 5MB</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Username</label>
                        <input
                            type="text"
                            value={form.username}
                            disabled
                            className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 text-neutral-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none text-sm text-black transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none text-sm text-black transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Address</label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none text-sm text-black resize-none transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="mt-2 bg-black text-white py-3 text-sm font-medium hover:bg-neutral-800 transition disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;