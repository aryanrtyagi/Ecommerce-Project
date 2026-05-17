import { createContext, useContext, useState, useEffect } from "react";
import { authFetch } from "../utils/auth";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    //Fetch Cart from BE

    const fetchCart = async () => {
        try{
            const res = await authFetch(`${BASEURL}/api/cart/`)

            if(!res.ok){
                throw new Error("Failed to fetch cart");
            }
            
            const data = await res.json();
            console.log("Cart data:", data)
            setCartItems(data.items || [])
            setTotal(data.total || 0)

        }catch(error){
            console.log("Error Fetching Cart:", error);
            setCartItems([]);
            setTotal(0);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("access_token");

        if(token){
            fetchCart();
        }

    }, []);


    // Add to cart
    const addToCart = async (productId) => {
        try{
            const res = await authFetch(`${BASEURL}/api/cart/add/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({product_id: productId}),
            });
            if(!res.ok) throw new Error("Failed to add to Cart");
            await fetchCart();
            toast.success("Added to cart! 🛒")
        }catch(error){
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart!");
        }
    };

    // Remove item
    const removeFromCart = async(itemId) => {
        try{
            const res = await authFetch(`${BASEURL}/api/cart/remove/`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({item_id: itemId}),
            });
            if(!res.ok) throw new Error("Failed to remove from cart");
            await fetchCart();
            toast.success("Item removed from cart");
        }catch(error){
            console.error("Error removing from Cart:",error);
            toast.error("Failed to remove item");
        }
    }

    // Update quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1){
            await removeFromCart(itemId);
            return;
        }

        try{
            const res = await authFetch(`${BASEURL}/api/cart/update/`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({item_id: itemId, quantity}),
            });
            if(!res.ok) throw new Error("Failed to update successfully");
            await fetchCart();
            toast.success("Cart Updated");
        }catch(error){
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        }
    };

    const clearCart = ()=>{
        setCartItems([]);
        setTotal(0);
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);