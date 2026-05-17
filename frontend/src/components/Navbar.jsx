import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { clearTokens, getAccessToken } from "../utils/auth";

function Navbar() {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const cartCount = (cartItems || []).reduce(
        (total, item) => total + item.quantity,
        0
    );

    const isLoggedIn = !!getAccessToken();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = search.trim();
        if (!trimmed) return;
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch(e);
    };

    const handleLogout = () => {
        clearTokens();
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-indigo-600 whitespace-nowrap"
                >
                    🛍️ Shoppit
                </Link>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex-1 max-w-2xl"
                >
                    <div className="flex items-center border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 bg-white overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 px-4 py-2 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        />

                        {/* Clear button — shown when there's text */}
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="px-2 text-gray-400 hover:text-gray-600 transition"
                                aria-label="Clear search"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Search icon button */}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center"
                            aria-label="Search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Right Section */}
                <div className="flex items-center gap-6 whitespace-nowrap">

                    <Link
                        to="/"
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        Home
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Auth */}
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-indigo-600 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;