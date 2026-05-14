import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";

function ProductList() {

    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        fetch(
            `${BASE}/api/products/?search=${search}`
        )
            .then((response) => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch products"
                    );
                }

                return response.json();

            })

            .then((data) => {

                setProducts(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setError(error.message);

                setLoading(false);

            });

    }, [search]);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Hero Section */}
            <HeroSection />

            {/* Categories */}
            <Categories />

            {/* Products Section */}
            <div className="px-6 py-12">

                {/* Heading */}
                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold text-gray-800">
                        All Products
                    </h1>

                    <p className="text-gray-600 mt-3">
                        Explore our latest collection
                    </p>

                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-10">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full max-w-2xl p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                </div>

                {/* Loading */}
                {loading ? (

                    <div className="text-center text-lg font-semibold">
                        Loading products...
                    </div>

                ) : error ? (

                    <div className="text-center text-red-500 font-semibold">
                        {error}
                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {products.length > 0 ? (

                            products.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />

                            ))

                        ) : (

                            <p className="col-span-full text-center text-gray-500">
                                No products found.
                            </p>

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default ProductList;