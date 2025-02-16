import axios from "axios";
import React, { useEffect, useState } from "react";
import yaml from "js-yaml";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };
};

export const getCurrentUser = async () => {
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

  try {
    const response = await axios.get(`http://localhost:${config.port}/api/auth/me`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Auth error:", error.response?.data || error.message);
    return null;
  }
};

export const getProtectedData = async (endpoint) => {
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
  try {
    const response = await axios.get(`http://localhost:${config.port}${endpoint}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Protected API error:", error.response?.data || error.message);
    return null;
  }
};
