import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadConfig from "../utils/config";

const [PORT, setPort] = useState("");

  useEffect(() => {
    loadConfig().then((config) => {
      if (config && config.port) {
        setPort(config.port);
      }
    });
  }, []);

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:${PORT}/api/files/search`, {
        params: { q: query },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
      toast.error("Error searching files.");
    }
  };

  const openFolder = (folderPath) => {
    navigate(`/explorer/${folderPath}`);
  };

  const openFilePreview = (filePath) => {
    navigate(`/preview?filePath=${encodeURIComponent(filePath)}`);
  };

  return (
    <div>
      <h2>Search Files</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for files..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((file, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {file.isDirectory ? (
                <button onClick={() => openFolder(file.path)}>
                  📂 {file.name} (Folder)
                </button>
              ) : (
                <button onClick={() => openFilePreview(file.path)}>
                  📄 {file.name} (File)
                </button>
              )}
              <p style={{ fontSize: "12px", color: "gray", marginTop: "5px" }}>
                Path: {file.path}
              </p>
            </li>
          ))
        )}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Search;
