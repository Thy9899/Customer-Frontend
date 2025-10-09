import React, { createContext, useState, useEffect, useRef } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logoutTimer = useRef(null); // ✅ track timer across renders
  const AUTO_LOGOUT_MS = 60 * 60 * 1000; // 1 hour = 3600000 ms

  // Load saved user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");

    if (savedUser && token && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime, 10);
      if (elapsed >= AUTO_LOGOUT_MS) {
        // ⏰ Already expired
        handleLogout();
      } else {
        // ✅ Still valid
        setUser(JSON.parse(savedUser));
        // Continue the timer for the remaining time
        startLogoutTimer(AUTO_LOGOUT_MS - elapsed);
      }
    }
  }, []);

  // Helper: Start auto logout timer
  const startLogoutTimer = (duration = AUTO_LOGOUT_MS) => {
    clearTimeout(logoutTimer.current); // clear existing timer
    logoutTimer.current = setTimeout(() => {
      handleLogout();
    }, duration);
  };

  // ✅ Handle logout in one place
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    window.location.reload();
  };

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("loginTime", Date.now().toString()); // ✅ record login time
    setUser(data.user);

    startLogoutTimer(); // ✅ start 1-hour timer
    return data.user;
  };

  const register = async (email, password, username) => {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");

    localStorage.setItem("token", data.token || "");
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("loginTime", Date.now().toString()); // ✅ record register time
    setUser(data);

    startLogoutTimer(); // ✅ start timer
    return data;
  };

  const logout = () => handleLogout(); // keep consistency

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
