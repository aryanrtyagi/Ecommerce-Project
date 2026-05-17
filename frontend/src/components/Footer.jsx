import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-indigo-400 mb-3">🛍️ Shoppit</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Shoppit is a modern ecommerce platform built to deliver a seamless
                        shopping experience — from browsing to checkout, all in one place.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                    <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-indigo-400 transition">🏠 Home</Link></li>
                        <li><Link to="/products" className="hover:text-indigo-400 transition">📦 Products</Link></li>
                        <li><Link to="/cart" className="hover:text-indigo-400 transition">🛒 Cart</Link></li>
                        <li><Link to="/checkout" className="hover:text-indigo-400 transition">💳 Checkout</Link></li>
                    </ul>
                </div>

                {/* About Me */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">About the Developer</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Hi! I'm <span className="text-indigo-400 font-semibold">Aryan Tyagi</span>,
                        a full-stack developer passionate about building real-world web applications.
                        Shoppit is built with React, Django REST Framework, and Tailwind CSS.
                    </p>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Connect with Me</h3>
                    <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                        <li>
                            <a
                                href="https://github.com/aryanrtyagi"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-indigo-400 transition"
                            >
                                🐙 GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/in/aryan-tyagi-a74010289"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-indigo-400 transition"
                            >
                                💼 LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:aryan210609@gmail.com"
                                className="hover:text-indigo-400 transition"
                            >
                                📧 Email Me
                            </a>
                        </li>
                    </ul>
                </div >
            </div >

            {/* Divider */}
            < div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm" >
                <p>© 2026 <span className="text-indigo-400 font-semibold">Aryan Tyagi</span>. All Rights Reserved.</p>
                <p className="mt-1"> Built using React + Django + Tailwind CSS</p>
            </div >
        </footer >
    );
}

export default Footer;