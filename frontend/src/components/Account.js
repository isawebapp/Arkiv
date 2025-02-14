import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", getAuthHeaders())
      .then(response => setUser(response.data))
      .catch(error => toast.error("Failed to fetch account details"));
  }, []);

  return (
    <div style={styles.container}>
      <h2>My Account</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  }
};

export default Account;
