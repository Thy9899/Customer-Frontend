import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = () => {
    axios
      .get("http://localhost:8000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cancel order
  const cancelOrder = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/orders/${id}`, {
        status: "cancelled",
      });
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer_name}</td>
                <td>{order.item_name}</td>
                <td>${order.price}</td>
                <td>{order.status}</td>
                <td>
                  {/* Disable if status is accepted */}
                  <button
                    className="btn btn-primary btn-sm me-2"
                    disabled={order.status === "accepted"}
                  >
                    Action
                  </button>

                  {/* Cancel button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancelOrder(order.id)}
                    disabled={order.status === "cancelled"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
