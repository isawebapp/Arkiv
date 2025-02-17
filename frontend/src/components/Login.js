import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useConfig } from "../context/ConfigContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = useConfig();

  if (!config) return <p>Loading configuration...</p>;

  if (!config.features.login) {
    return (
      <div>
        <h2>Login</h2>
        <p>Login is disabled.</p>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.server.hostname}:${config.server.hostPort}/api/auth/login`, { username, password });
      dispatch(loginSuccess(response.data));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
