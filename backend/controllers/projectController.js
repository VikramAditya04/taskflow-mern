import Project from "../models/projectModel.js";

// CREATE PROJECT (Admin only)
export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  try {
    // Validation
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    // Create project
    const project = await Project.create({
      name,
      description,
      createdBy: userId,
      members: [userId], 
    });

    // Populate references
    await project.populate("createdBy", "name email");
    await project.populate("members", "name email");

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER PROJECTS
export const getUserProjects = async (req, res) => {
  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";

  try {
    const query = isAdmin
      ? {}
      : {
          $or: [{ createdBy: userId }, { members: userId }],
        };

    // Get all projects where user is creator or member
    const projects = await Project.find(query)
      .populate("createdBy", "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Projects retrieved successfully",
      total: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECT BY ID
export const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";

  try {
    const project = await Project.findById(projectId)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is member or creator
    const isMember =
      project.members.some((member) => member._id.toString() === userId.toString()) ||
      project.createdBy._id.toString() === userId.toString();

    if (!isAdmin && !isMember) {
      return res.status(403).json({ message: "Access denied to this project" });
    }

    res.status(200).json({
      message: "Project retrieved successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MEMBER TO PROJECT
export const addMemberToProject = async (req, res) => {
  const { projectId, userId: newMemberId } = req.body;
  const requesterId = req.user._id;

  try {
    // Validation
    if (!projectId || !newMemberId) {
      return res.status(400).json({ message: "Project ID and User ID are required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if requester is admin or project creator
    if (project.createdBy.toString() !== requesterId.toString()) {
      return res
        .status(403)
        .json({ message: "Only project creator can add members" });
    }

    // Check if member already exists
    if (project.members.includes(newMemberId)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // Add member
    project.members.push(newMemberId);
    await project.save();

    await project.populate("members", "name email");

    res.status(200).json({
      message: "Member added successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE MEMBER FROM PROJECT
export const removeMemberFromProject = async (req, res) => {
  const { projectId, userId: memberToRemove } = req.body;
  const requesterId = req.user._id;

  try {
    // Validation
    if (!projectId || !memberToRemove) {
      return res.status(400).json({ message: "Project ID and User ID are required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if requester is project creator
    if (project.createdBy.toString() !== requesterId.toString()) {
      return res
        .status(403)
        .json({ message: "Only project creator can remove members" });
    }

    // Remove member
    project.members = project.members.filter(
      (member) => member.toString() !== memberToRemove
    );
    await project.save();

    await project.populate("members", "name email");

    res.status(200).json({
      message: "Member removed successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT
export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  const userId = req.user._id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is creator
    if (project.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only project creator can update it" });
    }

    // Update fields
    if (name) project.name = name;
    if (description) project.description = description;

    await project.save();
    await project.populate("createdBy", "name email");
    await project.populate("members", "name email");

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is creator
    if (project.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only project creator can delete it" });
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
