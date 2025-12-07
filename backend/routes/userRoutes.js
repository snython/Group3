const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/users
 * Get all users (for Users page)
 */
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({}, "name email").sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.error("Users list error", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/users/:id
 * Get a single user's public profile
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email createdAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get user profile error", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/users/:id
 * Update a user's profile (name, email, role, onboardingRequired)
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, email, role, onboardingRequired } = req.body;

    const allowedRoles = ["Employee", "Manager", "Admin"];

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;

    // Optional fields
    if (role && allowedRoles.includes(role)) {
      updates.role = role;
    }

    if (typeof onboardingRequired === "boolean") {
      updates.onboardingRequired = onboardingRequired;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select("name email role onboardingRequired createdAt");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update user error", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;