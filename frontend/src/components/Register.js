import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadConfig from "../utils/config";

const [PORT, setPort] = useState("");

  useEffect(() => {
    loadConfig().then((config) => {
      if (config && config.port) {
        setPort(config.port);
      }
    });
  }, []);

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:${PORT}/api/auth/register`, {
        username,
        password,
      });

      toast.success("Registration successful! You can now log in.");
    } catch (error) {
      toast.error("Registration failed. Username might already be taken.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
