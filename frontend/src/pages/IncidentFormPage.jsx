// src/pages/IncidentFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function IncidentFormPage({ mode = "create" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit" && id;

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignedTo: "",
  });

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  // Load existing incident when editing
  useEffect(() => {
    const loadIncident = async () => {
      if (!isEdit) return;

      try {
        setLoading(true);
        const res = await api.get(`/incidents/${id}`);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          priority: res.data.priority || "Low",
          status: res.data.status || "Open",
          assignedTo: res.data.assignedTo || "",
        });
      } catch (err) {
        console.error("Error loading incident", err);
        setError("Unable to load incident details.");
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isEdit) {
        await api.put(`/incidents/${id}`, form);
      } else {
        await api.post("/incidents", form);
      }

      navigate("/incidents");
    } catch (err) {
      console.error("Error saving incident", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while saving the incident."
      );
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading incident...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{isEdit ? "Edit Incident" : "New Incident"}</h1>

      <form className="form card" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Priority
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label>
          Assigned To
          <input
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {isEdit ? "Update Incident" : "Create Incident"}
        </button>
      </form>
    </div>
  );
}
