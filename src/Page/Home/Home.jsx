import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Checkout from "../CheckoutPage/CheckoutPage";
import Heart from "../Heart/HeartPage";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/heart" element={<Heart />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
