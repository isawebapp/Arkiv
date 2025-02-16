import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.yml");
        const text = await response.text();
        const parsedConfig = yaml.load(text);
        setConfig(parsedConfig);
      } catch (error) {
        console.error("Error loading config:", error);
      }
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:${config.port}/api/auth/me`, getAuthHeaders())
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
