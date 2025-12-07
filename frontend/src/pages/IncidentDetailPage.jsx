// src/pages/IncidentDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function IncidentDetailPage() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIncident = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/incidents/${id}`);
        setIncident(res.data);
      } catch (err) {
        console.error("Error loading incident", err);
        setError(
          err.response?.data?.message || "Unable to load this incident."
        );
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading incident...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="page">
        <p>Incident not found.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{incident.title}</h1>
          <p style={{ marginTop: "0.25rem", color: "#6b7280", fontSize: "0.9rem" }}>
            Reported by{" "}
            {incident.reportedBy?.name || "Unknown"} ·{" "}
            {incident.createdAt
              ? new Date(incident.createdAt).toLocaleString()
              : "Date not available"}
          </p>
        </div>

        <div>
          <Link
            to={`/incidents/${incident._id}/edit`}
            className="btn btn-secondary"
            style={{ marginRight: "0.5rem" }}
          >
            Edit Incident
          </Link>
          <Link to="/incidents" className="btn">
            Back to Incidents
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Priority:</strong> {incident.priority || "Not set"}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Status:</strong> {incident.status || "Not set"}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Description:</strong>
          <div style={{ marginTop: "0.35rem", whiteSpace: "pre-wrap" }}>
            {incident.description || "No description provided."}
          </div>
        </div>

        {incident.updatedAt && (
          <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#6b7280" }}>
            Last updated: {new Date(incident.updatedAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}