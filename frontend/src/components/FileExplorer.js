import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import { useConfig } from "../context/ConfigContext";

const FileExplorer = () => {
  const navigate = useNavigate();
  const { "*": currentPath = "" } = useParams();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;

  const fetchFiles = useCallback(async () => {

    if (!config.port) {
      console.warn("Skipping fetchFiles() because PORT is not set.");
      return;
    }

    try {
      console.log(`Fetching files from: http://localhost:${config.port}/api/files?folder=${currentPath}`);
      const { data } = await axios.get(`http://localhost:${config.port}/api/files?folder=${currentPath}`);
      setFiles(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching files:", error.response?.data || error.message);
      setError("Directory not found.");
    }
  }, [config.port, currentPath]);

  useEffect(() => {
    if (config.port) {
      fetchFiles();
    }
  }, [fetchFiles, config.port]);

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
      {files.length === 0 && !error && <p>No files found.</p>}
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
