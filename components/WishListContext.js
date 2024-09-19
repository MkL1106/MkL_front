import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext({
  wishListProducts: [],
  addProductToWishList: () => {},
  removeProductFromWishList: () => {},
  clearWishlist: () => {},
});

export function WishListContextProvider({ children }) {
  const [wishListProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    // Initialize wishlist from localStorage on mount
    if (typeof window !== "undefined") {
      const storedWishlist = window.localStorage.getItem("wishlist");
      if (storedWishlist) {
        try {
          setWishListProducts(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Failed to parse wishlist from localStorage:", error);
          setWishListProducts([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever wishListProducts changes
    if (typeof window !== "undefined") {
      if (wishListProducts.length > 0) {
        window.localStorage.setItem("wishlist", JSON.stringify(wishListProducts));
      } else {
        window.localStorage.removeItem("wishlist");
      }
    }
  }, [wishListProducts]);

  const addProductToWishList = (productId) => {
    setWishListProducts((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeProductFromWishList = (productId) => {
    setWishListProducts((prev) => prev.filter((product) => product !== productId));
  };

  const clearWishlist = () => {
    setWishListProducts([]);
  };

  return (
    <WishListContext.Provider
      value={{
        wishListProducts,
        addProductToWishList,
        removeProductFromWishList,
        clearWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
