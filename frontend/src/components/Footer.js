import React, { useState, useEffect } from "react";
import { useConfig } from "../context/ConfigContext";

const Footer = () => {
  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;
  
  return (
    <footer style={styles.footer}>
      <p>
        Powered by{" "}
        {config.url ? (
          <a href={config.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {config.url.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          "Unknown Source"
        )}
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    backgroundColor: "#f1f1f1",
    padding: "10px",
    fontSize: "14px",
    borderTop: "1px solid #ccc",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Footer;
