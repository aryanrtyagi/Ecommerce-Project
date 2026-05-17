import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

function ProductsPage() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";

    // Filter & sort state
    const [sortBy, setSortBy] = useState("default");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setLoading(true);
        const url = `${BASE}/api/products/?search=${query}`;
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch products");
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [query]);

    // Derive unique categories from fetched products (category is an object)
    const categories = useMemo(() => {
        const seen = new Set();
        return products
            .map((p) => p.category)
            .filter((cat) => {
                if (!cat) return false;
                const key = cat.id ?? cat;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
    }, [products]);

    // Apply filters + sorting client-side
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter — compare by id
        if (selectedCategory !== "all") {
            result = result.filter((p) => {
                const catId = p.category?.id ?? p.category;
                return String(catId) === String(selectedCategory);
            });
        }

        // Price range filter
        const min = parseFloat(priceRange.min);
        const max = parseFloat(priceRange.max);
        if (!isNaN(min)) result = result.filter((p) => parseFloat(p.price) >= min);
        if (!isNaN(max)) result = result.filter((p) => parseFloat(p.price) <= max);

        // Sorting
        switch (sortBy) {
            case "price_asc":
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "price_desc":
                result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case "name_asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name_desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return result;
    }, [products, sortBy, priceRange, selectedCategory]);

    const clearFilters = () => {
        setSortBy("default");
        setPriceRange({ min: "", max: "" });
        setSelectedCategory("all");
    };

    const hasActiveFilters =
        sortBy !== "default" ||
        priceRange.min !== "" ||
        priceRange.max !== "" ||
        selectedCategory !== "all";

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-12">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Products</h1>
                {query && (
                    <div className="flex items-center justify-center gap-4 mt-3">
                        <p className="text-gray-600">
                            Search results for:
                            <span className="font-semibold"> "{query}"</span>
                        </p>
                        <button
                            onClick={() => (window.location.href = "/")}
                            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>

            {/* Filter & Sort Bar — only shown after data loads */}
            {!loading && !error && (
                <div className="mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Left: toggle button + clear all */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilters((v) => !v)}
                                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4h18M7 8h10M10 12h4"
                                    />
                                </svg>
                                Filters
                                {hasActiveFilters && (
                                    <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                                        Active
                                    </span>
                                )}
                            </button>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-red-500 hover:text-red-700 transition"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        {/* Right: result count + sort */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                {filteredProducts.length} result
                                {filteredProducts.length !== 1 ? "s" : ""}
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="name_asc">Name: A → Z</option>
                                <option value="name_desc">Name: Z → A</option>
                            </select>
                        </div>
                    </div>

                    {/* Expandable filter panel */}
                    {showFilters && (
                        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-5 flex flex-wrap gap-6 shadow-sm">
                            {/* Category — only shown if products have categories */}
                            {categories.length > 0 && (
                                <div className="flex flex-col gap-1.5 min-w-160px">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Category
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="border border-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Price Range */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    Price Range
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) =>
                                            setPriceRange((prev) => ({
                                                ...prev,
                                                min: e.target.value,
                                            }))
                                        }
                                        className="border border-gray-300 text-sm rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                    <span className="text-gray-400">—</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) =>
                                            setPriceRange((prev) => ({
                                                ...prev,
                                                max: e.target.value,
                                            }))
                                        }
                                        className="border border-gray-300 text-sm rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Products grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center text-red-500 font-semibold">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No products match your filters.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductsPage;