import Task from "../models/taskModel.js";

// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";

  try {
    // Admin sees all tasks, members see only their assigned tasks
    const allTasks = await Task.find(isAdmin ? {} : { assignedTo: userId });

    // Count completed tasks
    const completedTasks = allTasks.filter((task) => task.status === "done").length;

    // Count pending tasks (not done)
    const pendingTasks = allTasks.filter((task) => task.status !== "done").length;

    // Count overdue tasks (dueDate < today and not completed)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueTasks = allTasks.filter((task) => {
      if (task.status === "done") return false;
      if (!task.dueDate) return false;

      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);

      return taskDueDate < today;
    }).length;

    // Calculate task status breakdown
    const todoTasks = allTasks.filter((task) => task.status === "todo").length;
    const inProgressTasks = allTasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    res.status(200).json({
      message: "Dashboard stats retrieved successfully",
      stats: {
        totalTasks: allTasks.length,
        completedTasks,
        pendingTasks,
        overdueTasks,
        breakdown: {
          todo: todoTasks,
          inProgress: inProgressTasks,
          done: completedTasks,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DASHBOARD WITH TASKS DETAILS
export const getDashboardWithTasks = async (req, res) => {
  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";

  try {
    // Admin sees all tasks, members see only their assigned tasks
    const allTasks = await Task.find(isAdmin ? {} : { assignedTo: userId })
      .populate("projectId", "name")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 }); // Sort by due date

    // Categorize tasks
    const todoTasks = allTasks.filter((task) => task.status === "todo");
    const inProgressTasks = allTasks.filter((task) => task.status === "in-progress");
    const doneTasks = allTasks.filter((task) => task.status === "done");

    // Get overdue tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueTasks = allTasks.filter((task) => {
      if (task.status === "done") return false;
      if (!task.dueDate) return false;

      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);

      return taskDueDate < today;
    });

    res.status(200).json({
      message: "Dashboard with tasks retrieved successfully",
      stats: {
        totalTasks: allTasks.length,
        completedTasks: doneTasks.length,
        pendingTasks: todoTasks.length + inProgressTasks.length,
        overdueTasks: overdueTasks.length,
      },
      tasks: {
        todo: todoTasks,
        inProgress: inProgressTasks,
        done: doneTasks,
        overdue: overdueTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
