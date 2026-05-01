import express from "express";
import userAuth from "../middleware/userAuth.js";
import isAdmin from "../middleware/roleMiddleware.js";
import {
  createProject,
  getUserProjects,
  getProjectById,
  addMemberToProject,
  removeMemberFromProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Create project (Admin only)
router.post("/", userAuth, isAdmin, createProject);

// Get all projects for logged-in user
router.get("/", userAuth, getUserProjects);

// Get project by ID
router.get("/:projectId", userAuth, getProjectById);

// Add member to project
router.post("/:projectId/members", userAuth, addMemberToProject);

// Remove member from project
router.delete("/:projectId/members", userAuth, removeMemberFromProject);

// Update project
router.put("/:projectId", userAuth, updateProject);

// Delete project
router.delete("/:projectId", userAuth, deleteProject);

export default router;
