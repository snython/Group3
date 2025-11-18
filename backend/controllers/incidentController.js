// src/controllers/incidentController.js
import Incident from "../models/Incident.js";

export const createIncident = async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const incident = await Incident.create({
      title,
      description,
      priority: priority || "Low",
      assignedTo: assignedTo || "",
      reportedBy: req.user._id
    });

    res.status(201).json(incident);
  } catch (err) {
    console.error("Create incident error:", err.message);
    res.status(500).json({ message: "Error creating incident" });
  }
};

export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (err) {
    console.error("Get incidents error:", err.message);
    res.status(500).json({ message: "Error fetching incidents" });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate(
      "reportedBy",
      "name email"
    );
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json(incident);
  } catch (err) {
    console.error("Get incident error:", err.message);
    res.status(500).json({ message: "Error fetching incident" });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    const { title, description, priority, status, assignedTo } = req.body;

    if (title !== undefined) incident.title = title;
    if (description !== undefined) incident.description = description;
    if (priority !== undefined) incident.priority = priority;
    if (status !== undefined) incident.status = status;
    if (assignedTo !== undefined) incident.assignedTo = assignedTo;

    const updated = await incident.save();
    res.json(updated);
  } catch (err) {
    console.error("Update incident error:", err.message);
    res.status(500).json({ message: "Error updating incident" });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    await incident.deleteOne();
    res.json({ message: "Incident deleted" });
  } catch (err) {
    console.error("Delete incident error:", err.message);
    res.status(500).json({ message: "Error deleting incident" });
  }
};