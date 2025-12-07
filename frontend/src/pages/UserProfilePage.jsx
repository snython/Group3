import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";   // ⬅ added useNavigate
import api from "../api/axios";
import "./UserProfilePage.css";

export default function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();    // ⬅ initialize navigation
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error loading user profile", err);
        setError(
          err.response?.data?.message || "Unable to load user profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="user-profile-page">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-page">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-page">
        <p>User not found.</p>
      </div>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="user-profile-page">

      {/* ░░ BACK TO SEARCH BUTTON ░░ */}
      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => navigate("/users")} // Or navigate(-1)
        >
          <span className="arrow">←</span> Back to User Search
        </button>
      </div>

      {/* Existing Profile Card */}
      <div className="user-profile-card">
        <div className="user-profile-header">
          <div className="user-profile-avatar">{initial}</div>
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="user-profile-body">
          <h2>Profile Details</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {user.createdAt && (
            <p>
              <strong>Member since:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}