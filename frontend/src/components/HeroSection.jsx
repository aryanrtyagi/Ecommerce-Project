import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function HeroSection() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch featured products
    useEffect(() => {
        fetch(`${BASE}/api/products/`)
            .then((res) => res.json())
            .then((data) => {
                const FEATURED_IDS = [10,11,12]
                setProducts(data.filter((p) => FEATURED_IDS.includes(p.id)));
            }) // first n products
            .catch((err) => console.error("Failed to fetch products:", err));
    }, []);

    // Auto-rotate every 3 seconds
    useEffect(() => {
        if (products.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [products]);

    const currentProduct = products[currentIndex];

    return (
        <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">

            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]"></div>
                <div className="absolute top-150px right-100px w-500px h-500px bg-white/5 blur-3xl rounded-full"></div>
                <div className="absolute bottom-150px left-100px w-400px h-400px bg-purple-500/10 blur-3xl rounded-full"></div>
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>
                    {/* Small Tag */}
                    <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full mb-8 shadow-lg">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm tracking-wider uppercase text-gray-300">
                            Trending Collection 2026
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8 text-white">
                        Elevate Your
                        <span className="block text-white">Digital Shopping</span>
                        Experience
                    </h1>

                    {/* Description */}
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                        Discover premium fashion, cutting-edge electronics, modern
                        essentials, and luxury collections crafted for the future.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-14">
                        <Link
                            to="/products"
                            className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Shop Now
                                <span className="group-hover:translate-x-1 transition">→</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient from-gray-200 to-white opacity-0 group-hover:opacity-100 transition"></div>
                        </Link>

                        <Link
                            to="/cart"
                            className="border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-black transition duration-300"
                        >
                            View Cart
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-lg">
                        <div>
                            <h3 className="text-4xl font-bold mb-2">10K+</h3>
                            <p className="text-gray-500 text-sm uppercase tracking-wide">Customers</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">500+</h3>
                            <p className="text-gray-500 text-sm uppercase tracking-wide">Products</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">24/7</h3>
                            <p className="text-gray-500 text-sm uppercase tracking-wide">Support</p>
                        </div>
                    </div>
                </div>

                {/* Right Side — Carousel */}
                <div className="relative flex justify-center">

                    {/* Glow Rings */}
                    <div className="absolute w-450px h-450px border border-white/10 rounded-full"></div>
                    <div className="absolute w-550px h-550px border border-white/5 rounded-full"></div>

                    {currentProduct ? (
                        <div className="relative group cursor-pointer" onClick={() => navigate(`/product/${currentProduct.id}`)}>

                            {/* Main Image */}
                            <img
                                key={currentProduct.id}
                                src={currentProduct.image}
                                alt={currentProduct.name}
                                className="w-72 md:w-full h-420px object-cover rounded-[2.5rem] border border-white/10 shadow-[0_20px_100px_rgba(255,255,255,0.08)] group-hover:scale-105 transition duration-700"
                            />

                            {/* Floating Card — Price + Name */}
                            <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl">
                                <p className="text-gray-400 text-sm mb-1">
                                    {currentProduct.category?.name || "Featured"}
                                </p>
                                <h3 className="text-xl font-bold truncate max-w-160px">
                                    {currentProduct.name}
                                </h3>
                                <p className="text-green-400 font-semibold mt-1">
                                    ₹{currentProduct.price}
                                </p>
                            </div>

                            {/* Floating Badge — Best Seller */}
                            <div className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                                ⭐ Best Seller
                            </div>

                            {/* Click hint */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <span className="bg-black/60 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold">
                                    View Product →
                                </span>
                            </div>
                        </div>
                    ) : (
                        // Skeleton while loading
                        <div className="w-72 md:w-420px h-420px bg-white/5 rounded-[2.5rem] animate-pulse" />
                    )}

                    {/* Dot indicators */}
                    {products.length > 0 && (
                        <div className="absolute -bottom-16 flex gap-2">
                            {products.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        i === currentIndex
                                            ? "bg-white w-6"
                                            : "bg-white/30"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HeroSection;