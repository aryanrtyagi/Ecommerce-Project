import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUser } from "../context/UserContext";
import { clearTokens, getAccessToken } from "../utils/auth";
import toast from "react-hot-toast";

function Navbar() {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { profile, clearProfile } = useUser();
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
    const initial = profile?.username ? profile.username.charAt(0).toUpperCase() : "?";

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
        clearProfile();
        toast.success("Logged out successfully");
        setMenuOpen(false);
        setAccountOpen(false);
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="bg-white border-b border-neutral-200 fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="font-display text-2xl font-semibold text-black whitespace-nowrap tracking-tight"
                    onClick={() => setMenuOpen(false)}
                >
                    GLITCH & CO.
                </Link>

                {/* Search Bar — hidden on mobile */}
                <form
                    onSubmit={handleSearch}
                    className="flex-1 max-w-2xl hidden md:block"
                >
                    <div className="flex items-center border border-neutral-300 focus-within:border-black bg-white overflow-hidden transition-colors">
                        <input
                            type="text"
                            placeholder="Search products…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 px-4 py-2 outline-none bg-transparent text-black placeholder-neutral-400 text-sm"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="px-2 text-neutral-400 hover:text-black transition"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black hover:bg-neutral-800 transition flex items-center justify-center"
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Desktop Right Section — hidden on mobile */}
                <div className="hidden md:flex items-center gap-7 whitespace-nowrap">
                    <Link to="/" className="text-neutral-600 hover:text-black text-sm font-medium tracking-wide transition-colors">
                        Home
                    </Link>

                    <Link to="/cart" className="relative text-neutral-600 hover:text-black text-sm font-medium tracking-wide transition-colors">
                        Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-4 bg-black text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="text-neutral-600 hover:text-black text-sm font-medium tracking-wide transition-colors">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-black text-white px-5 py-2 text-sm font-medium tracking-wide hover:bg-neutral-800 transition">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="relative" ref={accountRef}>
                            <button
                                onClick={() => setAccountOpen((v) => !v)}
                                className="flex items-center gap-2 text-neutral-700 hover:text-black text-sm font-medium tracking-wide transition-colors"
                            >
                                <span className="w-7 h-7 rounded-full border border-black overflow-hidden flex items-center justify-center text-xs font-semibold bg-black text-white shrink-0">
                                    {profile?.profile_picture ? (
                                        <img
                                            src={profile.profile_picture}
                                            alt={profile.username}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        initial
                                    )}
                                </span>
                                Account
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 transition-transform ${accountOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {accountOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white border border-black py-1 z-50">
                                    <Link
                                        to="/profile"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-black hover:text-white transition-colors"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-black hover:text-white transition-colors"
                                    >
                                        Order History
                                    </Link>
                                    <Link
                                        to="/wishlist"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:bg-black hover:text-white transition-colors"
                                    >
                                        <span>Wishlist</span>
                                        {wishlistCount > 0 && (
                                            <span className="text-xs font-mono">{wishlistCount}</span>
                                        )}
                                    </Link>
                                    <Link
                                        to="/cart"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:bg-black hover:text-white transition-colors"
                                    >
                                        <span>My Cart</span>
                                        {cartCount > 0 && (
                                            <span className="text-xs font-mono">{cartCount}</span>
                                        )}
                                    </Link>
                                    <div className="border-t border-neutral-200 my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-black hover:text-white transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Right — Cart icon + Hamburger */}
                <div className="flex md:hidden items-center gap-4">
                    <Link to="/cart" className="relative text-neutral-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger button */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="text-neutral-700 hover:text-black transition"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-4 flex flex-col gap-1">

                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mb-3">
                        <div className="flex items-center border border-neutral-300 focus-within:border-black bg-white overflow-hidden transition-colors">
                            <input
                                type="text"
                                placeholder="Search products…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 px-4 py-2 outline-none bg-transparent text-black placeholder-neutral-400 text-sm"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="px-2 text-neutral-400 hover:text-black transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-black hover:bg-neutral-800 transition flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Mobile Nav Links */}
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-neutral-700 hover:text-black text-sm font-medium py-3 border-b border-neutral-100"
                    >
                        Home
                    </Link>

                    <Link
                        to="/cart"
                        onClick={() => setMenuOpen(false)}
                        className="text-neutral-700 hover:text-black text-sm font-medium py-3 border-b border-neutral-100 flex items-center justify-between"
                    >
                        <span>Cart</span>
                        {cartCount > 0 && <span className="text-xs font-mono text-neutral-500">{cartCount}</span>}
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-neutral-700 hover:text-black text-sm font-medium py-3 border-b border-neutral-100"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition text-center mt-3"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 text-neutral-700 hover:text-black text-sm font-medium py-3 border-b border-neutral-100"
                            >
                                <span className="w-6 h-6 rounded-full border border-black overflow-hidden flex items-center justify-center text-[10px] font-semibold bg-black text-white shrink-0">
                                    {profile?.profile_picture ? (
                                        <img
                                            src={profile.profile_picture}
                                            alt={profile.username}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        initial
                                    )}
                                </span>
                                My Profile
                            </Link>
                            <Link
                                to="/orders"
                                onClick={() => setMenuOpen(false)}
                                className="text-neutral-700 hover:text-black text-sm font-medium py-3 border-b border-neutral-100"
                            >
                                Order History
                            </Link>
                            <Link
                                to="/wishlist"
                                onClick={() => setMenuOpen(false)}
                                className="text-neutral-700 hover:text-black text-sm font-medium py-3 border-b border-neutral-100 flex items-center justify-between"
                            >
                                <span>Wishlist</span>
                                {wishlistCount > 0 && <span className="text-xs font-mono text-neutral-500">{wishlistCount}</span>}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="border border-black text-black px-4 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition w-full mt-3"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;