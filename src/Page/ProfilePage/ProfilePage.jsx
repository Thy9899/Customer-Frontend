import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    username: user?.username || "",
    picture: user?.picture || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      if (form.picture instanceof File) {
        formData.append("picture", form.picture);
      }
      if (form.password) formData.append("password", form.password);

      const res = await fetch(`http://localhost:8000/api/profile/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      // ✅ Backend returns { message, user: {...} }
      const updatedUser = { ...user, ...data.user };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Profile updated successfully!");
      setShowEdit(false);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <button className="btn-back" onClick={() => navigate("/")}>
          <img src="./src/assets/icon/back.png" alt="back" />
          <span>Back</span>
        </button>

        <img
          src={
            user.picture
              ? user.picture.startsWith("http")
                ? user.picture
                : `http://localhost:8000/picture/${user.picture}`
              : "./Photos/profile.png"
          }
          alt={user.username}
          className="profile-avatar"
        />

        <h2>{user.username}</h2>
        <p>Email: {user.email}</p>

        <div className="profile-actions">
          <button className="edit-btn" onClick={() => setShowEdit(true)}>
            Edit Profile
          </button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {message && <p className="status-message">{message}</p>}
      </div>

      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="form-username"
                value={form.username}
                onChange={handleChange}
                required
              />

              <label>Avatar</label>
              <input
                type="file"
                name="form-picture"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({ ...prev, picture: file }));
                  }
                }}
              />

              <label>New Password</label>
              <input
                type="password"
                name="form-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
              />

              <label>Confirm Password</label>
              <input
                type="password"
                name="form-confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
              />

              <div className="modal-buttons">
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
