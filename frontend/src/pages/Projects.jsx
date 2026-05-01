import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectForm from "../components/ProjectForm";
import { toast } from "react-toastify";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(false);

  const fetchProjects = async () => {
    const response = await api.get("/projects");
    const nextProjects = response.data?.projects || [];
    setProjects(nextProjects);
    if (!selectedProjectId && nextProjects.length) {
      setSelectedProjectId(nextProjects[0]._id);
    }
  };

  const fetchUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data?.users || []);
    if (!selectedUserId && response.data?.users?.length) {
      setSelectedUserId(response.data.users[0]._id);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await Promise.all([fetchProjects(), fetchUsers()]);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load projects");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddMember = async () => {
    if (!selectedProjectId || !selectedUserId) return;

    setMemberLoading(true);
    try {
      await api.post(`/projects/${selectedProjectId}/members`, {
        projectId: selectedProjectId,
        userId: selectedUserId,
      });
      toast.success("Member added successfully");
      await fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add member");
    } finally {
      setMemberLoading(false);
    }
  };

  const selectedProject = projects.find((project) => project._id === selectedProjectId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Projects</h1>
        <p className="mt-2 text-gray-400">
          Create projects, review teams, and manage project members.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ProjectForm onCreated={fetchProjects} />

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Add Member to Project</h2>
            <p className="mt-1 text-sm text-gray-400">
              Select a project and assign a team member.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2" htmlFor="projectSelect">
                Project
              </label>
              <select
                id="projectSelect"
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

            <div>
              <label className="block text-sm text-gray-400 mb-2" htmlFor="userSelect">
                User
              </label>
              <select
                id="userSelect"
                value={selectedUserId}
                onChange={(event) => setSelectedUserId(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {users.length ? (
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

            <button
              type="button"
              onClick={handleAddMember}
              disabled={memberLoading || !selectedProjectId || !selectedUserId}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {memberLoading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white">Project List</h2>
        {loading ? (
          <p className="mt-4 text-gray-400">Loading projects...</p>
        ) : projects.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {project.description || "No description provided"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProjectId(project._id)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white hover:opacity-80 cursor-pointer"
                  >
                    Select
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>Created by: {project.createdBy?.name || "Unknown"}</p>
                  <p className="mt-1">Members: {project.members?.length || 0}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-400">No projects found.</p>
        )}
      </div>

      {selectedProject ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
          <p className="text-sm text-gray-400">Selected project</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{selectedProject.name}</h3>
          <p className="mt-2 text-gray-400">{selectedProject.description || "No description provided"}</p>
        </div>
      ) : null}
    </div>
  );
}
