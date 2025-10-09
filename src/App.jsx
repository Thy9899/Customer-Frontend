import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { SavedProvider } from "./context/SavedContext";
import Home from "./Home/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SavedProvider>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </SavedProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
