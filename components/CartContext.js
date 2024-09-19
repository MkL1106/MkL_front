import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    // Initialize state from local storage
    useEffect(() => {
        const storedCart = typeof window !== "undefined" ? localStorage.getItem('cart') : null;
        if (storedCart) {
            setCartProducts(JSON.parse(storedCart));
        }
    }, []);

    // Update local storage whenever cartProducts changes
    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cartProducts]);

    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }

    function removeProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((_, index) => index !== pos);
            }
            return prev;
        });
    }

    function clearCart() {
        setCartProducts([]);
        localStorage.removeItem('cart');
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
