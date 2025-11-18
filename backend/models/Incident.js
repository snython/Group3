import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, default: "Low" },
    status: { type: String, default: "Open" },
    assignedTo: { type: String },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Incident", IncidentSchema);