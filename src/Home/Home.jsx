import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../Page/Dashboard/Dashboard";
import Checkout from "../Page/CheckoutPage/CheckoutPage";
import Saved from "../Page/Saved/SavedPage";
import Profile from "../Page/ProfilePage/ProfilePage";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
