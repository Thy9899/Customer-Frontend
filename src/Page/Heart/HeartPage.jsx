import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHeart } from "../../context/HeartContext";
import { useNavigate } from "react-router-dom";
import "./HeartPage.css";

const HeartPage = () => {
  const { likedProducts, toggleLike } = useHeart();
  const navigate = useNavigate();

  return (
    <div className="liked-products">
      <div className="header">
        {/* Back Button */}
        <button className="btn-back" onClick={() => navigate("/")}>
          <img src="./src/assets/icon/back.png" alt="back" />
          <span>Back</span>
        </button>

        <h2 className="page-title">❤️ Your Favorites</h2>
      </div>

      <div className="box-container">
        {likedProducts.length === 0 ? (
          <p className="alert">No favorite items yet.</p>
        ) : (
          likedProducts.map((item, index) => (
            <div className="box heart-item" key={item.id}>
              {/* Product Image */}
              <div className="image">
                <img
                  src={`http://localhost:8000/storage/${item.image}`}
                  alt={item.name}
                />
              </div>

              {/* Product Info */}
              <h3>{item.name}</h3>
              <div className="price">
                ${item.subtotal}
                {item.price && <span>${item.price}</span>}
              </div>

              {/* Buttons */}
              <div className="btn">
                <div className="icons">
                  <button
                    className="icon-btn heart active"
                    onClick={() => toggleLike(item)}
                  >
                    <img src="./src/assets/icon/save.png" alt="heart" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeartPage;
