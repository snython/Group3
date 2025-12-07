// src/api/userApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // adjust if your API is on a different base path
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