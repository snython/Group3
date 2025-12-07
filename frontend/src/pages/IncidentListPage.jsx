// src/pages/IncidentListPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function IncidentListPage() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIncidents = async () => {
    try {
      const res = await api.get("/incidents");
      setIncidents(res.data);
    } catch (err) {
      console.error("Error loading incidents", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this incident?")) return;
    await api.delete(`/incidents/${id}`);
    loadIncidents();
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  if (loading) return <p className="page">Loading incidents...</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Incidents</h1>
        <Link className="btn" to="/incidents/new">
          + New Incident
        </Link>
      </div>

      {incidents.length === 0 ? (
        <p>No incidents yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Reported By</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i._id}>
                <td>{i.title}</td>
                <td>{i.priority}</td>
                <td>{i.status}</td>
                <td>{i.reportedBy?.name}</td>
                <td>{new Date(i.createdAt).toLocaleString()}</td>
                <td>
                  <Link
                    to={`/incidents/${i._id}/edit`}
                    className="btn btn-secondary"
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
               
                  </Link>
                       <Link
     to={`/incidents/${i._id}/view`}
  className="btn btn-secondary"
  style={{ marginRight: "0.5rem" }}
>
  View
</Link>
                  <button onClick={() => handleDelete(i._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}