import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/admin-login", { username, password });

      dispatch(loginSuccess({ token: data.token, isAdmin: true }));
      toast.success("Admin login successful!");
      navigate("/admin");

    } catch (error) {
      console.error("Admin login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Invalid admin credentials!");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <input type="text" placeholder="Admin Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
