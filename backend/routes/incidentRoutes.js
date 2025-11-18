import express from "express";
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
} from "../controllers/incidentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getIncidents)
  .post(createIncident);

router
  .route("/:id")
  .get(getIncidentById)
  .put(updateIncident)
  .delete(deleteIncident);

export default router;