import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">

            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]"></div>

                <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full"></div>

                <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full"></div>

                {/* Grid Pattern */}
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
                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
                        Elevate Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                            Digital Shopping
                        </span>
                        Experience
                    </h1>

                    {/* Description */}
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                        Discover premium fashion, cutting-edge electronics,
                        modern essentials, and luxury collections crafted for
                        the future.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-14">

                        <Link
                            to="/products"
                            className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Shop Now
                                <span className="group-hover:translate-x-1 transition">
                                    →
                                </span>
                            </span>

                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition"></div>
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
                            <p className="text-gray-500 text-sm uppercase tracking-wide">
                                Customers
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold mb-2">500+</h3>
                            <p className="text-gray-500 text-sm uppercase tracking-wide">
                                Products
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold mb-2">24/7</h3>
                            <p className="text-gray-500 text-sm uppercase tracking-wide">
                                Support
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative flex justify-center">

                    {/* Glow Ring */}
                    <div className="absolute w-[450px] h-[450px] border border-white/10 rounded-full"></div>

                    <div className="absolute w-[550px] h-[550px] border border-white/5 rounded-full"></div>

                    {/* Main Image */}
                    <div className="relative group">

                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                            alt="Luxury Product"
                            className="w-[340px] md:w-[500px] object-cover rounded-[2.5rem] border border-white/10 shadow-[0_20px_100px_rgba(255,255,255,0.08)] group-hover:scale-105 transition duration-700"
                        />

                        {/* Floating Card */}
                        <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl">
                            <p className="text-gray-400 text-sm mb-1">
                                Premium Collection
                            </p>

                            <h3 className="text-2xl font-bold">
                                50% OFF
                            </h3>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                            ⭐ Best Seller
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;