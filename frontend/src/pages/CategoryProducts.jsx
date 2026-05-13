import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function CategoryProducts() {

    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const { id } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${BASE}/api/categories/${id}/products/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((err) => console.error(err));

    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-4xl font-bold text-center mb-10">
                Category Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        No Products Found
                    </p>
                )}

            </div>
        </div>
    );
}

export default CategoryProducts;