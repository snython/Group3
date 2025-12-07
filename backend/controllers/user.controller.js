import extend from "lodash/extend.js";
import User from "../models/user.model.js";

export const me = (req, res) => {
  // req.auth._id set by requireSignin / JWT middleware
  if (!req.profile) return res.status(400).json({ error: "User not found" });
  const user = req.profile.toObject();
  delete user.hashed_password;
  delete user.salt;
  res.json(user);
};

export const updateMe = async (req, res) => {
  try {
    let user = req.profile;

    // Only update allowed fields
    if (typeof req.body.name !== "undefined") user.name = req.body.name;
    if (typeof req.body.email !== "undefined") user.email = req.body.email;
    if (typeof req.body.role !== "undefined") user.role = req.body.role;
    if (typeof req.body.onboardingRequired !== "undefined") {
      user.onboardingRequired = req.body.onboardingRequired;
    }

    user.updated = Date.now();
    await user.save();

    user = user.toObject();
    delete user.hashed_password;
    delete user.salt;

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Could not update profile" });
  }
};

// existing userByID should look something like:
export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};