import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the File Explorer</h1>
      <p>Use the links below to navigate:</p>
      <ul>
        <li><Link to="/explorer">File Explorer</Link></li>
        <li><Link to="/search">Search Files</Link></li>
      </ul>
    </div>
  );
};

export default Home;
