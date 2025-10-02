import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Product from "../../components/Products/Products";
import ContactUs from "../../components/ContactUs/ContactUs";
import Footer from "../../components/Footer/Footer";

const API_URL = "http://localhost:8000/api/students"; // your product API

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch products
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div>
      <Header />
      <Menu onSelectCategory={setSelectedCategory} /> {/* ✅ Pass callback */}
      <Product products={filteredProducts} /> {/* ✅ Pass products */}
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Dashboard;
