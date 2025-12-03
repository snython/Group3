const express = require("express");
const Incident = require("../models/Incident");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/incidents
 * List all incidents, with reporter name
 */
router.get("/", auth, async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("reportedBy", "name email") 
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (err) {
    console.error("Get incidents error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/incidents/:id
 * Single incident for edit page
 */
router.get("/:id", auth, async (req, res) => {
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
    console.error("Get incident error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/incidents
 * Create new incident
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const incident = await Incident.create({
      title,
      description,
      priority,
      status,
      assignedTo,
      reportedBy: req.user.id, 
    });

    // populate before sending back
    await incident.populate("reportedBy", "name email");

    res.status(201).json(incident);
  } catch (err) {
    console.error("Create incident error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/incidents/:id
 * Update incident
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status, assignedTo },
      { new: true, runValidators: true }
    ).populate("reportedBy", "name email");

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.json(incident);
  } catch (err) {
    console.error("Update incident error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/incidents/:id
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json({ message: "Incident deleted" });
  } catch (err) {
    console.error("Delete incident error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my/stats", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [reported, resolved] = await Promise.all([
      Incident.countDocuments({ reportedBy: userId }),
      Incident.countDocuments({ reportedBy: userId, status: "Closed" }),
    ]);

    res.json({ reported, resolved });
  } catch (err) {
    console.error("Get my incident stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;