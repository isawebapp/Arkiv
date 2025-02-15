import React from "react";

const REACT_APP_DEPLOY_URL = process.env.REACT_APP_DEPLOY_URL;

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        Powered by{" "}
        {REACT_APP_DEPLOY_URL ? (
          <a href={REACT_APP_DEPLOY_URL} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {REACT_APP_DEPLOY_URL.replace(/^https?:\/\//, "")}
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
