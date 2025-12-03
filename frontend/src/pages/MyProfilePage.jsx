// src/pages/MyProfilePage.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyProfilePage.css";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  
  const [incidentStats, setIncidentStats] = useState({
    reported: 0,
    resolved: 0,
  });

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
        });
      } catch (err) {
        console.error("Error loading profile", err);
      }
    };

    loadProfile();
  }, []);

  // Load incident stats for user
  useEffect(() => {
    const loadIncidentStats = async () => {
      try {
        const res = await api.get("/incidents/my/stats");
        // { reported, resolved }
        setIncidentStats(res.data);
      } catch (err) {
        console.error("Error loading incident stats", err);
      }
    };

    loadIncidentStats();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile?._id) return;

    setSaving(true);
    setMessage("");
    try {
      // assumes PUT /users/:id exists
      await api.put(`/users/${profile._id}`, form);
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile", err);
      setMessage("Unable to update profile right now.");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <div className="profile-page">Loading profile...</div>;
  }

  const initial = profile.name ? profile.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-header-main">
          <div className="profile-avatar-large">{initial}</div>
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
          </div>
        </div>
        <button className="profile-delete-btn" type="button">
          Delete
        </button>
      </div>

      <div className="profile-layout">
        {/* LEFT COLUMN */}
        <div className="profile-left">
          <div className="profile-card">
            <h2>Profile Image</h2>
            <div className="profile-image-box">
              <div className="profile-avatar-large">{initial}</div>
            </div>
            <button className="profile-link-btn" type="button">
              Change Profile Image
            </button>
          </div>

          <div className="profile-card">
            <h2>Employee Details</h2>
            <form onSubmit={handleSave} className="profile-form">
              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="profile-form-actions">
                <button
                  className="profile-save-btn"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="profile-cancel-btn"
                  type="button"
                  onClick={() =>
                    setForm({
                      name: profile.name || "",
                      email: profile.email || "",
                    })
                  }
                >
                  Cancel
                </button>
              </div>
              {message && <p className="profile-message">{message}</p>}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="profile-right">
          <div className="profile-card">
            <h2>Role</h2>
            <label>
              Role
              <select defaultValue="Employee">
                <option>Employee</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </label>

            <h2 style={{ marginTop: "1.5rem" }}>Onboarding</h2>
            <div className="profile-onboarding-row">
              <span>Onboarding required</span>
              <label className="profile-switch">
                <input type="checkbox" defaultChecked />
                <span className="profile-slider"></span>
              </label>
            </div>

            <div className="profile-onboarding-row">
              <span>Office Tour</span>
              <span className="profile-percent">84%</span>
            </div>

            
            <div className="profile-onboarding-row">
              <span>Incidents Resolved</span>
              <span className="profile-percent">
                {incidentStats.resolved}
              </span>
            </div>

            <div className="profile-onboarding-row">
              <span>Incidents Reported</span>
              <span className="profile-percent">
                {incidentStats.reported}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






