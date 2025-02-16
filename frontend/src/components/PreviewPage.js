import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useConfig } from "../context/ConfigContext";

const PreviewPage = () => {
  const location = useLocation();
  const filePath = new URLSearchParams(location.search).get("filePath");
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState(null);
  const config = useConfig();

  useEffect(() => {
    if (config?.server.port && filePath) {
      const filePreviewUrl = `${config.server.hostname}:${config.server.port}/api/files/view?filePath=${encodeURIComponent(filePath)}`;

      fetch(filePreviewUrl)
        .then((response) => {
          if (!response.ok) throw new Error("File not found");
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setFileUrl(url);
        })
        .catch(() => setError("File not found"));
    }
  }, [filePath, config?.server.port]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${config.server.hostname}:${config.server.port}/api/files/view?filePath=${encodeURIComponent(filePath)}`);
      if (!response.ok) throw new Error("File not found");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filePath.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file.");
    }
  };

  if (!config) {
    return <p>Loading configuration...</p>;
  }

  if (!config.features.preview) {
    return (
      <div>
        <h2>File Preview</h2>
        <p>File preview is disabled. Please contact support.</p>
      </div>
    );
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div style={styles.container}>
      <h2>Preview: {filePath?.split("/").pop()}</h2>
      {fileUrl ? (
        <>
          <div style={styles.buttonContainer}>
            <button style={styles.downloadButton} onClick={() => window.history.back()}>Back</button>
            <hr />
            <button style={styles.downloadButton} onClick={handleDownload}>⬇ Download</button>
          </div>
          <object data={fileUrl} type="application/pdf" style={styles.pdf}>
            <p>Preview not supported. <a href={fileUrl} download>Download file</a></p>
          </object>
        </>
      ) : (
        <p>Loading file...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  buttonContainer: {
    marginBottom: "20px",
  },
  downloadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  pdf: {
    width: "100%",
    height: "600px",
  },
};

export default PreviewPage;
