import React, { useState, useEffect } from "react";

const Footer = () => {
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

  return (
    <footer style={styles.footer}>
      <p>
        Powered by{" "}
        {config.url? (
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
