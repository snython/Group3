// src/api/userApi.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // backend URL
});

// attach token if you use JWT in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get currently logged-in user's profile
export function getMyProfile() {
  return api.get("/users/me");
}

// Update currently logged-in user's profile
export function updateMyProfile(payload) {
  return api.put("/users/me", payload);
}

// (used above in the user profile page)
export function getUserById(id) {
  return api.get(`/users/${id}`);
}