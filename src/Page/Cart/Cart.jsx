import React from "react";
import { useCart } from "../../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning">No items in your cart.</div>
      ) : (
        <table className="table table-bordered shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th>Total ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.subtotal}</td>
                <td>{item.quantity}</td>
                <td>${item.subtotal * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan="4" className="text-end">
                Grand Total
              </td>
              <td colSpan="2">${getTotal()}</td>
            </tr>
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <button className="btn btn-success mt-3" onClick={clearCart}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
