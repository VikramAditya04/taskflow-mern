import express from "express";
import userAuth from "../middleware/userAuth.js";
import isAdmin from "../middleware/roleMiddleware.js";
import {
  createTask,
  getTasksByProject,
  getUserTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Create task (Admin only)
router.post("/", userAuth, isAdmin, createTask);

// Get tasks for a project
router.get("/:projectId", userAuth, getTasksByProject);
router.get("/project/:projectId", userAuth, getTasksByProject);

// Get all tasks assigned to user
router.get("/", userAuth, getUserTasks);

// Update task status
router.put("/:id/status", userAuth, updateTaskStatus);
router.put("/:taskId/status", userAuth, updateTaskStatus);

// Update task (full update)
router.put("/:id", userAuth, updateTask);
router.put("/:taskId", userAuth, updateTask);

// Delete task
router.delete("/:taskId", userAuth, deleteTask);

export default router;
