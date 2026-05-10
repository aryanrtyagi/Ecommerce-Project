import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl">

      {/* Clickable Product Area */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mb-3">
          {product.description}
        </p>
      </Link>

      {/* Price + Button */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xl font-bold text-indigo-600">
          ₹{product.price}
        </span>

        <button
          onClick={() => addToCart(product.id)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;