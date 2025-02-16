import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import loadConfig from "../utils/config"; // Import the function to load config.yml

const FileExplorer = () => {
  const navigate = useNavigate();
  const { "*": currentPath = "" } = useParams();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [apiBaseUrl, setApiBaseUrl] = useState("");

  // Load API base URL from config.yml
  useEffect(() => {
    loadConfig().then((config) => {
      if (config && config.REACT_APP_API_BASE_URL) {
        setApiBaseUrl(config.REACT_APP_API_BASE_URL);
      }
    });
  }, []);

  // Fetch files from API
  const fetchFiles = useCallback(async () => {
    if (!apiBaseUrl) return; // Wait until API base URL is loaded

    try {
      const { data } = await axios.get(`${apiBaseUrl}/api/files?folder=${currentPath}`);
      setFiles(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching files:", error.response?.data || error.message);
      setError("Directory not found");
    }
  }, [apiBaseUrl, currentPath]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  const handleOpenFolder = (folderName) => {
    navigate(`/explorer/${currentPath ? `${currentPath}/` : ""}${folderName}`);
  };

  const handleGoBack = () => {
    const parentPath = currentPath.split("/").slice(0, -1).join("/");
    navigate(`/explorer/${parentPath}`);
  };

  const handleOpenFile = (fileName) => {
    const filePath = `${currentPath ? `${currentPath}/` : ""}${fileName}`;
    const previewUrl = `/preview?filePath=${encodeURIComponent(filePath)}`;
    navigate(previewUrl);
  };

  return (
    <div>
      <h2>File Explorer</h2>
      {currentPath && <button onClick={handleGoBack}>⬅ Back</button>}
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.isDirectory ? (
              <button onClick={() => handleOpenFolder(file.name)}>📂 {file.name}</button>
            ) : (
              <button onClick={() => handleOpenFile(file.name)}>📄 {file.name}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
