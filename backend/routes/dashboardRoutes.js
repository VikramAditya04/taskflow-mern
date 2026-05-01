import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getDashboardStats,
  getDashboardWithTasks,
} from "../controllers/dashboardController.js";

const router = express.Router();

// Get dashboard statistics
router.get("/stats", userAuth, getDashboardStats);

// Get dashboard with tasks details
router.get("/", userAuth, getDashboardWithTasks);

export default router;
