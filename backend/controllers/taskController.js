import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";

// CREATE TASK (Admin only)
export const createTask = async (req, res) => {
  const { title, description, assignedTo, projectId, dueDate } = req.body;
  const userId = req.user._id;

  try {
    // Validation
    if (!title || !assignedTo || !projectId) {
      return res.status(400).json({
        message: "Title, assignedTo, and projectId are required",
      });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      projectId,
      dueDate,
      createdBy: userId,
    });

    // Populate references
    await task.populate("assignedTo", "name email");
    await task.populate("projectId", "name");
    await task.populate("createdBy", "name email");

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS BY PROJECT
export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";

  try {
    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is member or creator
    const isMember =
      project.members.some((member) => member.toString() === userId.toString()) ||
      project.createdBy.toString() === userId.toString();

    if (!isAdmin && !isMember) {
      return res.status(403).json({ message: "Access denied to this project" });
    }

    // Get tasks
    const tasks = await Task.find(
      isAdmin ? { projectId } : { projectId, assignedTo: userId }
    )
      .populate("assignedTo", "name email")
      .populate("projectId", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks retrieved successfully",
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TASKS ASSIGNED TO USER
export const getUserTasks = async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await Task.find({ assignedTo: userId })
      .populate("assignedTo", "name email")
      .populate("projectId", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks retrieved successfully",
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
  const { taskId, id } = req.params;
  const taskLookupId = taskId || id;
  const { status } = req.body;
  const userId = req.user._id;

  try {
    // Validation
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatuses = ["todo", "in-progress", "done"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be one of: todo, in-progress, done",
      });
    }

    const task = await Task.findById(taskLookupId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is assigned to task or is admin
    if (
      task.assignedTo.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Only assigned user or admin can update task status",
      });
    }

    // Update status
    task.status = status;
    await task.save();

    await task.populate("assignedTo", "name email");
    await task.populate("projectId", "name");
    await task.populate("createdBy", "name email");

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK (Full update)
export const updateTask = async (req, res) => {
  const { taskId, id } = req.params;
  const taskLookupId = taskId || id;
  const { title, description, assignedTo, dueDate, status } = req.body;
  const userId = req.user._id;

  try {
    const task = await Task.findById(taskLookupId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is creator or admin
    if (task.createdBy.toString() !== userId.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only task creator or admin can update it",
      });
    }

    // Update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) task.assignedTo = assignedTo;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;

    await task.save();
    await task.populate("assignedTo", "name email");
    await task.populate("projectId", "name");
    await task.populate("createdBy", "name email");

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  const { taskId, id } = req.params;
  const taskLookupId = taskId || id;
  const userId = req.user._id;

  try {
    const task = await Task.findById(taskLookupId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is creator or admin
    if (task.createdBy.toString() !== userId.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only task creator or admin can delete it",
      });
    }

    await Task.findByIdAndDelete(taskLookupId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
