import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { HeartProvider } from "./context/HeartContext";
import Home from "./Page/Home/Home";

function App() {
  return (
    <CartProvider>
      <HeartProvider>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </HeartProvider>
    </CartProvider>
  );
}

export default App;
