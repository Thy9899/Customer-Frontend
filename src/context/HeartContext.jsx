import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const HeartContext = createContext();

export const useHeart = () => useContext(HeartContext);

export const HeartProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  // Fetch liked products on mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/likes") // expects full product objects in response
      .then((res) => {
        setLikedProducts(res.data.map((item) => item.product));
      })
      .catch((err) => console.error("Error fetching likes:", err));
  }, []);

  // Toggle like
  const toggleLike = async (product) => {
    try {
      const exists = likedProducts.find((p) => p.id === product.id);

      if (exists) {
        await axios.delete(`http://localhost:8000/api/likes/${product.id}`);
        setLikedProducts((prev) => prev.filter((p) => p.id !== product.id));
      } else {
        await axios.post("http://localhost:8000/api/likes", {
          product_id: product.id,
        });
        setLikedProducts((prev) => [...prev, product]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <HeartContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </HeartContext.Provider>
  );
};
