import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Error</h2>
      <p>{message || "An unknown error occurred."}</p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
};

export default ErrorPage;
