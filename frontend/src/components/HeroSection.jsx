import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function HeroSection() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch zo product hai
    useEffect(() => {
        fetch(`${BASE}/api/products/`)
            .then((res) => res.json())
            .then((data) => {
                const FEATURED_IDS = [2,4,5,6]
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

            <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>
                    {/* Small Tag */}
                    <div className="inline-flex items-center gap-2 border border-white/25 px-5 py-2 mb-8">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        <span className="text-xs tracking-[0.2em] uppercase text-neutral-300">
                            Trending Collection 2026
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight mb-8 text-white">
                        Elevate Your
                        <span className="block italic font-medium text-neutral-300">Digital Shopping</span>
                        Experience
                    </h1>

                    {/* Description */}
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-xl mb-10">
                        Discover premium fashion, cutting-edge electronics, modern
                        essentials, and considered collections — presented without distraction.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-14">
                        <Link
                            to="/products"
                            className="group relative overflow-hidden bg-white text-black px-8 py-4 font-medium text-base transition duration-300 hover:bg-neutral-200"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Shop Now
                                <span className="group-hover:translate-x-1 transition">→</span>
                            </span>
                        </Link>

                        <Link
                            to="/cart"
                            className="border border-white/25 px-8 py-4 font-medium text-base hover:bg-white hover:text-black transition duration-300"
                        >
                            View Cart
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-lg border-t border-white/15 pt-8">
                        <div>
                            <h3 className="font-mono-price text-3xl font-semibold mb-1">10K+</h3>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">Customers</p>
                        </div>
                        <div>
                            <h3 className="font-mono-price text-3xl font-semibold mb-1">500+</h3>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">Products</p>
                        </div>
                        <div>
                            <h3 className="font-mono-price text-3xl font-semibold mb-1">24/7</h3>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">Support</p>
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

                            {/* Main Image — grayscale by default, reveals color on hover */}
                            <img
                                key={currentProduct.id}
                                src={currentProduct.image}
                                alt={currentProduct.name}
                                className="w-72 md:w-full h-420px object-cover border border-white/15 grayscale group-hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Floating Card — Price + Name */}
                            <div className="absolute -bottom-8 -left-8 bg-black/80 backdrop-blur-xl border border-white/15 p-5">
                                <p className="text-neutral-400 text-xs uppercase tracking-widest mb-1">
                                    {currentProduct.category?.name || "Featured"}
                                </p>
                                <h3 className="font-display text-lg font-semibold truncate max-w-160px">
                                    {currentProduct.name}
                                </h3>
                                <p className="font-mono-price text-white font-medium mt-1">
                                    ₹{currentProduct.price}
                                </p>
                            </div>

                            {/* Floating Badge — Best Seller */}
                            <div className="absolute top-6 right-6 bg-white text-black px-4 py-1.5 text-xs font-semibold tracking-wide">
                                BEST SELLER
                            </div>

                            {/* Click hint */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <span className="bg-white text-black px-5 py-2 text-sm font-semibold">
                                    View Product →
                                </span>
                            </div>
                        </div>
                    ) : (
                        // Skeleton while loading
                        <div className="w-72 md:w-420px h-420px bg-white/5 animate-pulse" />
                    )}

                    {/* Dot indicators */}
                    {products.length > 0 && (
                        <div className="absolute -bottom-16 flex gap-2">
                            {products.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-1 transition-all duration-300 ${
                                        i === currentIndex
                                            ? "bg-white w-8"
                                            : "bg-white/30 w-4"
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