import axios from "axios";
import { useConfig } from "../context/ConfigContext";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };
};

export const getCurrentUser = async () => {
  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;

  try {
    const response = await axios.get(`${config.server.hostname}:${config.server.port}/api/auth/me`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Auth error:", error.response?.data || error.message);
    return null;
  }
};

export const getProtectedData = async (endpoint) => {
  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;
  
  try {
    const response = await axios.get(`${config.server.hostname}:${config.server.port}${endpoint}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Protected API error:", error.response?.data || error.message);
    return null;
  }
};
