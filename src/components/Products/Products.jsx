import React from "react";
import "./Products.css";
import { useCart } from "../../context/CartContext";
import { useSaved } from "../../context/SavedContext";

const Products = ({ products }) => {
  const { addToCart } = useCart();
  const { likedProducts, toggleLike, isLiked } = useSaved();

  return (
    <section className="products" id="products">
      <h1 className="heading">
        <span>Products</span>
      </h1>

      <div className="box-container">
        {products.map((product) => (
          <div className="box" key={product.id}>
            {/* Discount */}
            {product.discount && (
              <span className="discount">-{product.discount}%</span>
            )}

            {/* Product Image */}
            <div className="image">
              <img
                src={`http://localhost:8000/Images/${product.image}`}
                alt={product.name}
              />
            </div>

            {/* Buttons */}
            <div className="btn">
              <div className="icons">
                {/* Saved */}
                <button
                  className={`icon-btn saved ${
                    isLiked(product.id) ? "active" : ""
                  }`}
                  onClick={() => toggleLike(product)}
                >
                  <img src="./src/assets/icon/save.png" alt="saved" />
                </button>

                {/* Cart */}
                <button
                  className="cart-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                {/* Share */}
                <button className="icon-btn">
                  <img src="./src/assets/icon/forward-big.png" alt="share" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <h3>{product.name}</h3>
            <div className="price">
              ${product.subtotal}
              {product.price && <span>${product.price}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
