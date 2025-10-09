import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SavedContext = createContext();
export const useSaved = () => useContext(SavedContext);

export const SavedProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  // ✅ Fetch saved products on mount
  useEffect(() => {
    const fetchSaved = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // not logged in, skip

      try {
        const res = await axios.get("http://localhost:8000/api/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Backend returns { list: [...] } or just [...]
        const list = res.data.list || res.data || [];
        setLikedProducts(list);
      } catch (err) {
        console.error("Error fetching saved products:", err);
      }
    };

    fetchSaved();
  }, []);

  // ✅ Toggle like/save product
  const toggleLike = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("User not authenticated");
      return;
    }

    const exists = likedProducts.find((p) => p.id === product.id);

    try {
      if (exists) {
        // DELETE saved product
        await axios.delete(`http://localhost:8000/api/saved/${product.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLikedProducts((prev) => prev.filter((p) => p.id !== product.id));
      } else {
        // POST new saved product
        const res = await axios.post(
          "http://localhost:8000/api/saved",
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image || null,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const savedItem = res.data.saved || res.data; // flexible structure
        setLikedProducts((prev) => [...prev, savedItem]);
      }
    } catch (error) {
      console.error("Error toggling saved product:", error);
    }
  };

  // ✅ Helper to check if product is liked
  const isLiked = (id) => likedProducts.some((p) => p.id === id);

  return (
    <SavedContext.Provider value={{ likedProducts, toggleLike, isLiked }}>
      {children}
    </SavedContext.Provider>
  );
};
