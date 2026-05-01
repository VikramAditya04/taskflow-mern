import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import KanbanBoard from "../components/KanbanBoard";
import { useAuth } from "../context/AuthContext";

export default function MyTasks() {
  useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState("");

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

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const response = await api.get("/tasks");
      const nextTasks = response.data?.tasks || [];
      setAllTasks(nextTasks);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
      setAllTasks([]);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await Promise.all([fetchProjects(), fetchTasks()]);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load member tasks");
      } finally {
        if (isMounted) {
          setLoadingProjects(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleTasks = selectedProjectId
    ? allTasks.filter((task) => task.projectId?._id === selectedProjectId)
    : allTasks;

  const handleStatusChange = async (taskId, status) => {
    setUpdatingTaskId(taskId);
    try {
      await api.put(`/tasks/${taskId}/status`, { status });
      toast.success("Task updated");
      await fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update task");
    } finally {
      setUpdatingTaskId("");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">My Tasks</h1>
        <p className="mt-2 text-gray-400">
          Manage only the tasks assigned to you.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2" htmlFor="memberProjectSelect">
            Select Project
          </label>
          <select
            id="memberProjectSelect"
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
        </div>

        <div className="text-sm text-gray-400">
          {selectedProject?.description || "Select a project to view your tasks."}
        </div>
      </div>

      {loadingProjects || loadingTasks ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-gray-400">
          Loading your tasks...
        </div>
      ) : visibleTasks.length ? (
        <KanbanBoard
          tasks={visibleTasks}
          onStatusChange={handleStatusChange}
          loadingTaskId={updatingTaskId}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-10 text-center text-gray-400">
          No tasks assigned yet.
        </div>
      )}
    </div>
  );
}
