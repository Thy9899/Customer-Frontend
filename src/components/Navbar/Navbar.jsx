import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Auth from "../Auth/Auth"; // ✅ import popup

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [showAuth, setShowAuth] = useState(false); // ✅ state for login popup

  // scroll function
  const handleScroll = (id) => {
    setMenu(id); // update active menu
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -100; // offset of 100px
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header>
      <div className="navbar">
        {/* Logo */}
        <div className="logo">
          <img src="/logo.jpg" alt="Logo" />
        </div>

        {/* Mobile menu toggle */}

        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler" className="menu-icon-nav">
          <img src="./src/assets/icon/menu.png" alt="menu" />
        </label>

        <input type="checkbox" id="icon-toggler" />
        <label htmlFor="icon-toggler" className="menu-icon-nav2">
          <img src="./src/assets/icon/image.png" alt="menu" />
        </label>

        {/* Menu */}
        <ul className="navbar-menu">
          <li
            onClick={() => handleScroll("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </li>
          <li
            onClick={() => handleScroll("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </li>
          <li
            onClick={() => handleScroll("products")}
            className={menu === "products" ? "active" : ""}
          >
            Product
          </li>
          <li
            onClick={() => handleScroll("about")}
            className={menu === "about" ? "active" : ""}
          >
            About
          </li>
          <li
            onClick={() => handleScroll("contact")}
            className={menu === "contact" ? "active" : ""}
          >
            Contact
          </li>
        </ul>

        {/* ✅*/}
        <div className="navbar-icons">
          <Link to="/heart">
            <li>
              <img src="./src/assets/icon/bookmark.png" alt="heart" />
              <span>Heart</span>
            </li>
          </Link>

          <Link to="/checkout">
            <li>
              <img src="./src/assets/icon/shopping-bag.png" alt="cart" />
              <span>Cart</span>
            </li>
          </Link>
        </div>

        {/* Right side */}
        <div className="navbar-right">
          <div className="navbar-search-icon">
            <input type="search" placeholder="Search..." />
            <img src="./src/assets/icon/search.png" alt="Search" />
          </div>

          <div className="navbar-user-icon">
            <button
              className="signin-btn"
              onClick={() => setShowAuth((prev) => !prev)} // ✅ toggle popup
            >
              <img
                src="./src/assets/icon/user.png"
                alt="User"
                className="user-icon"
              />
              <span>Sign in</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Show popup when button clicked */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </header>
  );
};

export default Navbar;
