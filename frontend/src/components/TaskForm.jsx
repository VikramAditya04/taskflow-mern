import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function TaskForm({ projectId, users, onCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((current) => ({ ...current, assignedTo: users?.[0]?._id || "" }));
  }, [users]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!projectId) {
      toast.error("Please select a project first");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      await api.post("/tasks", {
        ...formData,
        projectId,
      });
      toast.success("Task created successfully");
      setFormData({
        title: "",
        description: "",
        assignedTo: users?.[0]?._id || "",
        dueDate: "",
        priority: "medium",
      });
      onCreated?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-2" htmlFor="taskTitle">
          Task Title
        </label>
        <input
          id="taskTitle"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="New task"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2" htmlFor="taskDescription">
          Description
        </label>
        <textarea
          id="taskDescription"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task details"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm text-gray-400 mb-2" htmlFor="assignedTo">
            Assign User
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          >
            {users?.length ? (
              users.map((user) => (
                <option key={user._id} value={user._id} className="bg-slate-900">
                  {user.name} ({user.role})
                </option>
              ))
            ) : (
              <option value="" className="bg-slate-900">
                No users available
              </option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2" htmlFor="priority">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="low" className="bg-slate-900">Low</option>
          <option value="medium" className="bg-slate-900">Medium</option>
          <option value="high" className="bg-slate-900">High</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !projectId}
        className="w-full rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
