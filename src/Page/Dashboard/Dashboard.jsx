import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Product from "../../components/Products/Products";
import ContactUs from "../../components/ContactUs/ContactUs";
import Footer from "../../components/Footer/Footer";

const API_URL = "http://localhost:8000/api/products";

const Dashboard = ({ searchTerm }) => {
  // ✅ receive prop
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch products
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data.list || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Filter by category first
  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // ✅ Then filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div>
      <Header />
      <Menu onSelectCategory={setSelectedCategory} />
      <Product products={filteredProducts} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Dashboard;
