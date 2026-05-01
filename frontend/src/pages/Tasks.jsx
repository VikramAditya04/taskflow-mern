import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [statusLoading, setStatusLoading] = useState("");

  const selectedProject = useMemo(
    () => projects.find((project) => project._id === selectedProjectId),
    [projects, selectedProjectId]
  );

  const fetchProjects = async () => {
    const response = await api.get("/projects");
    const nextProjects = response.data?.projects || [];
    setProjects(nextProjects);
    if (!selectedProjectId && nextProjects.length) {
      setSelectedProjectId(nextProjects[0]._id);
    }
    return nextProjects;
  };

  const fetchUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data?.users || []);
    return response.data?.users || [];
  };

  const fetchTasks = async (projectId) => {
    if (!projectId) return;

    setLoadingTasks(true);
    try {
      const response = await api.get(`/tasks/${projectId}`);
      setTasks(response.data?.tasks || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
      setTasks([]);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await Promise.all([fetchProjects(), fetchUsers()]);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load tasks page");
      } finally {
        if (isMounted) {
          setLoadingProjects(false);
          setLoadingUsers(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchTasks(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleStatusChange = async (taskId, status) => {
    if (!status) return;

    setStatusLoading(taskId);
    try {
      await api.put(`/tasks/${taskId}/status`, { status });
      toast.success("Task status updated");
      await fetchTasks(selectedProjectId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task status");
    } finally {
      setStatusLoading("");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Tasks</h1>
        <p className="mt-2 text-gray-400">
          Select a project, create tasks, and update task status.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
            <label className="block text-sm text-gray-400 mb-2" htmlFor="taskProjectSelect">
              Select Project
            </label>
            <select
              id="taskProjectSelect"
              value={selectedProjectId}
              onChange={(event) => setSelectedProjectId(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {projects.length ? (
                projects.map((project) => (
                  <option key={project._id} value={project._id} className="bg-slate-900">
                    {project.name}
                  </option>
                ))
              ) : (
                <option value="" className="bg-slate-900">
                  No projects available
                </option>
              )}
            </select>
            <p className="mt-3 text-sm text-gray-400">
              {selectedProject?.description || "Choose a project to view tasks."}
            </p>
          </div>

          <TaskForm
            projectId={selectedProjectId}
            users={users}
            onCreated={() => fetchTasks(selectedProjectId)}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Project Tasks</h2>
              <p className="mt-1 text-sm text-gray-400">
                {selectedProject?.name || "Select a project to continue"}
              </p>
            </div>
          </div>

          {loadingTasks || loadingProjects || loadingUsers ? (
            <p className="mt-6 text-gray-400">Loading tasks...</p>
          ) : tasks.length ? (
            <div className="mt-6 space-y-4">
              {tasks.map((task) => (
                <div key={task._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-white font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-400">{task.description || "No description"}</p>
                      <p className="text-xs text-gray-500">
                        Assigned to: {task.assignedTo?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={task.status}
                        onChange={(event) => handleStatusChange(task._id, event.target.value)}
                        disabled={statusLoading === task._id}
                        className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-70"
                      >
                        <option value="todo" className="bg-slate-900">Todo</option>
                        <option value="in-progress" className="bg-slate-900">In Progress</option>
                        <option value="done" className="bg-slate-900">Done</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-400">No tasks found for this project.</p>
          )}
        </div>
      </div>
    </div>
  );
}
