import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

function ProductDetails() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch product details");
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    const handleAddToCart = async () => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
            return;
        }
        setAdding(true);
        for (let i = 0; i < quantity; i++) {
            await addToCart(product.id);
        }
        setAdding(false);
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-red-500 font-semibold text-lg mb-4">Error: {error}</p>
                <Link to="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-600 text-lg mb-4">No product found.</p>
                <Link to="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full p-6">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Image */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
                        <img
                            src={product.image || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className="w-full h-400px object-cover rounded-xl"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between gap-6">
                        <div>

                            {/* Category badge */}
                            {product.category && (
                                <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                    {product.category.name}
                                </span>
                            )}

                            {/* Name */}
                            <h1 className="text-3xl font-bold text-gray-800 mb-3">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <p className="text-3xl font-bold text-indigo-600 mb-4">
                                ₹{product.price}
                            </p>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">

                            {/* Quantity Selector */}
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="w-9 h-9 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100 transition flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="text-lg font-semibold w-6 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="w-9 h-9 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100 transition flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {adding ? "Adding..." : "🛒 Add to Cart"}
                            </button>

                            {/* Back */}
                            <Link
                                to="/products"
                                className="text-center text-sm text-gray-500 hover:text-indigo-600 transition"
                            >
                                ← Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;