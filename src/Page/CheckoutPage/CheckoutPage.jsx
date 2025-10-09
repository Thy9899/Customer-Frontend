import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const {
    cart,
    confirmed,
    addToCart,
    removeFromCart,
    clearCart,
    confirmCart,
    resetConfirmation,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [address, setAddress] = useState({
    line1: "123 Street",
    city: "Phnom Penh",
  });

  // Calculate totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.subtotal * item.quantity,
    0
  );
  const total = subtotal;

  /** Confirm Cart & Send to API */
  const handleConfirmCart = async () => {
    if (cart.length === 0) return toast.error("Cart is empty.");
    if (!address) return toast.info("Please add a shipping address.");

    setLoading(true);
    try {
      const payload = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.subtotal,
        })),
        subtotal,
        total,
        paymentMethod,
        shippingAddress: address,
      };

      const res = await axios.post("http://localhost:8000/api/orders", payload);

      if ([200, 201].includes(res.status)) {
        confirmCart();
        toast.success("Order confirmed successfully!");
        localStorage.setItem("lastOrder", JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === "insufficient_stock") {
        toast.error("Some items are out of stock.");
      } else {
        toast.error("Error confirming order.");
      }
      console.error("ConfirmCart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** Navigate to Payment */
  const handleProceedToPayment = () => {
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    if (!lastOrder) return toast.error("No pending order found.");
    navigate(`/payment/${lastOrder.orderId}`);
  };

  return (
    <div className="checkout-wrapper">
      <div className="header">
        {/* Back Button */}
        <button className="btn-back" onClick={() => navigate("/")}>
          <img src="./src/assets/icon/back.png" alt="back" />
          <span>Back</span>
        </button>

        <h2 className="page-title">🛒 Your Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="alert">No items in your cart.</div>
      ) : (
        <div className="checkout-container">
          {/* Address Section */}
          <div className="section">
            <h3>{address ? "Saved Address" : "No Address Saved"}</h3>
            <p>
              {address
                ? `${address.line1}, ${address.city}`
                : "Add an address for delivery"}
            </p>
            <button className="btn btn-info" disabled={loading}>
              {address ? "Edit Address" : "Add Address"}
            </button>
          </div>

          {/* Payment Method */}
          <div className="section">
            <h3>Choose Payment Method</h3>
            <div className="payment-options">
              {["visa", "mastercard", "tabby"].map((method) => (
                <label key={method} className="payment-option">
                  <input
                    type="radio"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    disabled={loading}
                  />
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Cart Items */}
          <div className="section">
            <h3>Cart Items</h3>
            {cart.map((item, index) => (
              <div className="cart-item" key={item.id}>
                <p className="item-index">{index + 1}</p>
                <div className="item-image">
                  <img
                    src={`http://localhost:8000/Images/${item.image}`}
                    alt={item.name}
                  />
                </div>
                <div className="item-info">
                  <p>{item.name}</p>
                </div>
                {!confirmed && (
                  <div className="item-quantity">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      disabled={loading}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)} disabled={loading}>
                      +
                    </button>
                  </div>
                )}
                <p className="item-price">
                  USD {(item.subtotal * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>USD {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>USD {total.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            {!confirmed ? (
              <div className="actions">
                <button
                  className="btn primary"
                  onClick={handleConfirmCart}
                  disabled={loading || cart.length === 0}
                >
                  {loading ? "Confirming..." : "Confirm Cart"}
                </button>
                <button
                  className="btn danger"
                  onClick={clearCart}
                  disabled={loading}
                >
                  Clear Cart
                </button>
              </div>
            ) : (
              <div className="actions">
                <p className="success-text">
                  ✅ Cart confirmed! Ready for checkout.
                </p>
                <button
                  className="btn success"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </button>
                <button
                  className="btn warning"
                  onClick={resetConfirmation}
                  disabled={loading}
                >
                  Edit Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
