import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group bg-white border border-neutral-200 hover:border-black transition-colors duration-300 p-4 relative">

      {/* Wishlist toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-6 right-6 z-10 w-8 h-8 bg-white/90 border border-neutral-200 flex items-center justify-center text-sm"
        aria-label="Toggle wishlist"
      >
        {inWishlist ? "●" : "○"}
      </button>

      {/* Clickable Product Area */}
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
          />
        </div>

        <h2 className="font-display text-base font-semibold text-black mb-1">
          {product.name}
        </h2>

        <p className="text-neutral-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
      </Link>

      {/* Price + Button */}
      <div className="flex items-center justify-between mt-3">
        <span className="font-mono-price text-lg font-semibold text-black">
          ₹{product.price}
        </span>

        <button
          onClick={() => addToCart(product.id)}
          className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;