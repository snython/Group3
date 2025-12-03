// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Error loading profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="page">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="page">No profile information available.</div>;
  }

  return (
    <div className="page">
      <h1>My Profile</h1>
      <div className="card">
        <p>
          <strong>Name: </strong>
          {profile.name}
        </p>
        <p>
          <strong>Email: </strong>
          {profile.email}
        </p>
      </div>
    </div>
  );
}
