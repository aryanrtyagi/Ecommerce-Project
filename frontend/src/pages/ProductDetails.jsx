import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductDetails({ products }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }, [id, BASEURL]);

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500 font-semibold">Error: {error}</div>;
    }

    if (!product) {
        return <div>No Product Found!!!</div>;
    }

    // Add to Cart functionality
    const handleAddToCart = () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }

        addToCart(product.id);
    }

    // Buy Now functionality
    const handleBuyNow = async () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }

        await addToCart(product.id);
        navigate('/cart');
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full grid md:grid-cols-2 gap-8 p-6">

                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-full max-h-[400px] object-cover rounded-xl"
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mb-6">
                            {product.description}
                        </p>

                        <p className="text-2xl font-bold text-indigo-600 mb-6">
                            ₹{product.price}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-between">

                        {/* Left: Buttons */}
                        <div className="flex gap-3">

                            {/* Add To Cart */}
                            <button
                                onClick={handleAddToCart}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                            >
                                Add to Cart
                            </button>

                            {/* Buy Now */}
                            <button
                                onClick={handleBuyNow}
                                className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Back to Home */}
                        <a
                            href="/"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                        >
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;