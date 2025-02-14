import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Auth error:", error.response?.data || error.message);
    return null;
  }
};

export const getProtectedData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Protected API error:", error.response?.data || error.message);
    return null;
  }
};
