import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSaved } from "../../context/SavedContext";
import { useNavigate } from "react-router-dom";
import "./SavedPage.css";

const SavedPage = () => {
  const { likedProducts, toggleLike } = useSaved();
  const navigate = useNavigate();

  return (
    <div className="saved-products">
      <div className="header">
        {/* Back Button */}
        <button className="btn-back" onClick={() => navigate("/")}>
          <img src="./src/assets/icon/back.png" alt="back" />
          <span>Back</span>
        </button>

        <h2 className="page-title">❤️ Your Saved Items</h2>
      </div>

      <div className="box-container">
        {likedProducts.length === 0 ? (
          <p className="alert">No saved items yet.</p>
        ) : (
          likedProducts.map((item) => (
            <div className="box saved-item" key={item.id}>
              {/* Product Image */}
              <div className="image">
                {item.image ? (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:8000/saved/${item.image}`
                    }
                    alt={item.name}
                  />
                ) : (
                  <img src="./src/assets/icon/no-image.png" alt="no image" />
                )}
              </div>

              {/* Product Info */}
              <h3>{item.name}</h3>
              <div className="price">${item.price}</div>

              {/* Buttons */}
              <div className="btn">
                <div className="icons">
                  <button
                    className="icon-btn saved active"
                    onClick={() => toggleLike(item)}
                  >
                    <img
                      src="https://images.icon-icons.com/3791/PNG/512/recycle_garbage_basket_remove_trash_delete_bin_icon_232706.png"
                      alt="save"
                    />
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

export default SavedPage;
