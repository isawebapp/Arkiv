import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.navbar}>
        File Explorer
      </h1>
      <Link to="/" style={styles.link}>Home</Link>
      <div>
        {token ? (
          <>
            <Link to="/account" style={styles.link}>My Account</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  link: {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
  button: {
    backgroundColor: "#ff4d4d",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default Header;
