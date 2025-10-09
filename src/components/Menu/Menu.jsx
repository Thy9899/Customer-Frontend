import React from "react";
import "./Menu.css";

const Menu = ({ onSelectCategory }) => {
  const menuItems = [
    { id: 1, name: "All", icon: "🍽️" },
    { id: 2, name: "Burger", icon: "🍔" },
    { id: 3, name: "Pizza", icon: "🍕" },
    { id: 4, name: "Coffee", icon: "☕" },
    { id: 5, name: "Dessert", icon: "🍰" },
    { id: 6, name: "Drinks", icon: "🥤" },
  ];

  const handleClick = (name) => {
    if (name === "All") {
      onSelectCategory(null); // ✅ null = show all products
    } else {
      onSelectCategory(name);
    }
  };

  return (
    <div className="menu-container" id="menu">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div
            className="menu-card"
            key={item.id}
            onClick={() => handleClick(item.name)}
          >
            <div className="menu-icon">{item.icon}</div>
            <p className="menu-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
