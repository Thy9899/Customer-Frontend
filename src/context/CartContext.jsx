import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setConfirmed(false);
  };

  const confirmCart = () => setConfirmed(true);
  const resetConfirmation = () => setConfirmed(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        confirmed,
        addToCart,
        removeFromCart,
        clearCart,
        confirmCart,
        resetConfirmation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
