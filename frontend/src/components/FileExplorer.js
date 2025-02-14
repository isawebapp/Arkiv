import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FileExplorer = () => {
  const navigate = useNavigate();
  const { "*": currentPath = "" } = useParams();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const fetchFiles = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/files?folder=${currentPath}`);
      setFiles(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching files:", error.response?.data || error.message);
      setError("Directory not found");
    }
  }, [currentPath]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  const handleOpenFolder = (folderName) => {
    navigate(`/${currentPath ? `${currentPath}/` : ""}${folderName}`);
  };

  const handleGoBack = () => {
    const parentPath = currentPath.split("/").slice(0, -1).join("/");
    navigate(`/${parentPath}`);
  };

  const handleOpenFile = (fileName) => {
    const filePath = `${currentPath ? `${currentPath}/` : ""}${fileName}`;
    const previewUrl = `/preview?filePath=${encodeURIComponent(filePath)}`;
    window.open(previewUrl, "_blank");
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
