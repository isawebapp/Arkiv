import React, { createContext, useState, useEffect, useContext } from "react";
import yaml from "js-yaml";

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.yml"); // Fetch config file
        const text = await response.text(); // Convert response to text
        const parsedConfig = yaml.load(text); // Parse YAML into JS object
        setConfig(parsedConfig); // Store config in state
      } catch (error) {
        console.error("Error loading config:", error);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
