import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function ProductsPage() {

    const BASE =
        import.meta.env.VITE_DJANGO_BASE_URL;

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    const [searchParams] =
        useSearchParams();

    const query =
        searchParams.get("search") || "";

    useEffect(() => {

        setLoading(true);

        const url =
            `${BASE}/api/products/?search=${query}`;

        console.log(url);

        fetch(url)

            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to fetch products"
                    );
                }

                return response.json();
            })

            .then((data) => {

                console.log(data);

                setProducts(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setError(error.message);

                setLoading(false);

            });

    }, [query]);

    return (

        <div className="min-h-screen bg-gray-100 px-6 py-12">

            {/* Heading */}
            <div className="text-center mb-10">

                <h1 className="text-4xl font-bold text-gray-800">
                    Products
                </h1>

                {query && (

                    <div className="flex items-center justify-center gap-4 mt-3">

                        <p className="text-gray-600">
                            Search results for:
                            <span className="font-semibold">
                                {" "}"{query}"
                            </span>
                        </p>

                        <button
                            onClick={() => window.location.href = "/"}
                            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
                        >
                            Clear Search
                        </button>

                    </div>

                )}

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
    );
}

export default ProductsPage;