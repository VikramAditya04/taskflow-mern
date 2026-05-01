import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ProjectForm({ onCreated }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    try {
      await api.post("/projects", formData);
      toast.success("Project created successfully");
      setFormData({ name: "", description: "" });
      onCreated?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-2" htmlFor="projectName">
          Project Name
        </label>
        <input
          id="projectName"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="New project"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2" htmlFor="projectDescription">
          Description
        </label>
        <textarea
          id="projectDescription"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project description"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
