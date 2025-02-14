import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        Powered by{" "}
        <a href="https://example.org" target="_blank" rel="noopener noreferrer" style={styles.link}>
          example.org
        </a>
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
    marginTop: "20px", // Adds space between content and footer
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Footer;
