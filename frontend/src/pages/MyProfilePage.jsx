// src/pages/MyProfilePage.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyProfilePage.css";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  
  const [role, setRole] = useState("Employee");
  const [onboardingRequired, setOnboardingRequired] = useState(true);

  const [incidentStats, setIncidentStats] = useState({
    reported: 0,
    resolved: 0,
  });

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        const data = res.data;

        setProfile(data);

        setForm({
          name: data.name || "",
          email: data.email || "",
        });

        
        setRole(data.role || "Employee");
        setOnboardingRequired(
          typeof data.onboardingRequired === "boolean"
            ? data.onboardingRequired
            : true
        );
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
      
      await api.put(`/users/${profile._id}`, {
        ...form,
        role,
        onboardingRequired,
      });

      
      
      setProfile((prev) => ({
        ...prev,
        name: form.name,
        email: form.email,
        role,
        onboardingRequired,
      }));

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
                  onClick={() => {
                    // reset to last known profile values
                    setForm({
                      name: profile.name || "",
                      email: profile.email || "",
                    });
                    setRole(profile.role || "Employee");
                    setOnboardingRequired(
                      typeof profile.onboardingRequired === "boolean"
                        ? profile.onboardingRequired
                        : true
                    );
                  }}
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
            
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </label>

            <h2 style={{ marginTop: "1.5rem" }}>Onboarding</h2>
            <div className="profile-onboarding-row">
              <span>Onboarding required</span>
              <label className="profile-switch">
                
                <input
                  type="checkbox"
                  checked={onboardingRequired}
                  onChange={(e) =>
                    setOnboardingRequired(e.target.checked)
                  }
                />
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