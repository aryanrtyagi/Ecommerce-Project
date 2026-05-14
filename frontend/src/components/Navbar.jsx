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

    // Search
    const handleSearch = (e) => {

        e.preventDefault();

        navigate(
            `/products?search=${encodeURIComponent(
                search.trim()
            )}`
        );
    };

    // Logout
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

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    />

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