import { createContext, useContext, useState, useEffect } from "react";
import { authFetch } from "../utils/auth";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [wishlistItems, setWishlistItems] = useState([]);

    const fetchWishlist = async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/wishlist/`);
            if (!res.ok) throw new Error("Failed to fetch wishlist");
            const data = await res.json();
            setWishlistItems(data || []);
        } catch (error) {
            console.log("Error fetching wishlist:", error);
            setWishlistItems([]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchWishlist();
        }
    }, []);

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.product.id === productId);
    };

    const addToWishlist = async (productId) => {
        try {
            const res = await authFetch(`${BASEURL}/api/wishlist/add/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product_id: productId }),
            });
            if (!res.ok) throw new Error("Failed to add to wishlist");
            await fetchWishlist();
            toast.success("Added to wishlist ❤️");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add to wishlist");
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const res = await authFetch(`${BASEURL}/api/wishlist/remove/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product_id: productId }),
            });
            if (!res.ok) throw new Error("Failed to remove from wishlist");
            await fetchWishlist();
            toast.success("Removed from wishlist");
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove from wishlist");
        }
    };

    const toggleWishlist = async (productId) => {
        if (isInWishlist(productId)) {
            await removeFromWishlist(productId);
        } else {
            await addToWishlist(productId);
        }
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                clearWishlist,
                fetchWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);