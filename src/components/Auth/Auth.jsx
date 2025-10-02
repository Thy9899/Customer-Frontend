import React, { useState } from "react";
import "./Auth.css";

const Auth = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login"); // "login" or "register"
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      alert(`Login:\nEmail: ${form.email}\nPassword: ${form.password}`);
    } else {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Register:\nEmail: ${form.email}\nPassword: ${form.password}`);
    }
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Tabs */}
        <div className="popup-tabs">
          <button
            className={activeTab === "login" ? "tab active" : "tab"}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "register" ? "tab active" : "tab"}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {activeTab === "register" && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="•••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Extra field for Register */}
          {activeTab === "register" && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="•••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {/* Options (only on login) */}
          {activeTab === "login" && (
            <div className="form-options">
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />{" "}
                Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot your password?
              </a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {activeTab === "login" ? "Sign in" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
