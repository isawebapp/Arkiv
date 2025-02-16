import React, { useState, useEffect } from "react";
import loadConfig from "../utils/config";

const Footer = () => {
  const [URL, setURL] = useState("");

  useEffect(() => {
    loadConfig().then((config) => {
      if (config && config.url) {
        setURL(config.url);
      }
    });
  }, []);

  return (
    <footer style={styles.footer}>
      <p>
        Powered by{" "}
        {URL ? (
          <a href={URL} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {URL.replace(/^https?:\/\//, "")}
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
