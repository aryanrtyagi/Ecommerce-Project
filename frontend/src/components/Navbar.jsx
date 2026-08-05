import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import { clearTokens, getAccessToken } from "../utils/auth";
import toast from "react-hot-toast";

function Navbar() {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);

    const cartCount = (cartItems || []).reduce(
        (total, item) => total + item.quantity,
        0
    );

    const wishlistCount = (wishlistItems || []).length;

    const isLoggedIn = !!getAccessToken();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = search.trim();
        if (!trimmed) return;
        setMenuOpen(false);
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch(e);
    };

    const handleLogout = () => {
        clearTokens();
        toast.success("Logged out Successfully !!");
        setMenuOpen(false);
        setAccountOpen(false);
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
                    onClick={() => setMenuOpen(false)}
                >
                    🛍️ Shoppit
                </Link>

                {/* Search Bar — hidden on mobile */}
                <form
                    onSubmit={handleSearch}
                    className="flex-1 max-w-2xl hidden md:block"
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
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="px-2 text-gray-400 hover:text-gray-600 transition"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center"
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Desktop Right Section — hidden on mobile */}
                <div className="hidden md:flex items-center gap-6 whitespace-nowrap">
                    <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Home
                    </Link>

                    <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 font-medium">
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="relative" ref={accountRef}>
                            <button
                                onClick={() => setAccountOpen((v) => !v)}
                                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
                            >
                                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                                    👤
                                </span>
                                Account
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${accountOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {accountOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <Link
                                        to="/profile"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        👤 My Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        📦 Order History
                                    </Link>
                                    <Link
                                        to="/wishlist"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <span>❤️ Wishlist</span>
                                        {wishlistCount > 0 && (
                                            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                                {wishlistCount}
                                            </span>
                                        )}
                                    </Link>
                                    <Link
                                        to="/cart"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <span>🛒 My Cart</span>
                                        {cartCount > 0 && (
                                            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                    <div className="border-t border-gray-100 my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Right — Cart icon + Hamburger */}
                <div className="flex md:hidden items-center gap-4">
                    <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 font-medium">
                        🛒
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger button */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="text-gray-700 hover:text-indigo-600 transition"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            // X icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 shadow-lg">

                    {/* Mobile Search */}
                    <form onSubmit={handleSearch}>
                        <div className="flex items-center border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 bg-white overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 px-4 py-2 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="px-2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Mobile Nav Links */}
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-indigo-600 font-medium py-2 border-b border-gray-100"
                    >
                        🏠 Home
                    </Link>

                    <Link
                        to="/cart"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-indigo-600 font-medium py-2 border-b border-gray-100"
                    >
                        🛒 Cart {cartCount > 0 && <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{cartCount}</span>}
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-indigo-600 font-medium py-2 border-b border-gray-100"
                            >
                                🔑 Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-center"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-indigo-600 font-medium py-2 border-b border-gray-100"
                            >
                                👤 My Profile
                            </Link>
                            <Link
                                to="/orders"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-indigo-600 font-medium py-2 border-b border-gray-100"
                            >
                                📦 Order History
                            </Link>
                            <Link
                                to="/wishlist"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-indigo-600 font-medium py-2 border-b border-gray-100"
                            >
                                ❤️ Wishlist {wishlistCount > 0 && <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{wishlistCount}</span>}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
                            >
                                🚪 Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;