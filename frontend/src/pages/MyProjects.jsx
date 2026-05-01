import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const response = await api.get("/projects");
        if (isMounted) {
          setProjects(response.data?.projects || []);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load projects");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">My Projects</h1>
        <p className="mt-2 text-gray-400">
          Projects you are part of. Read only access for members.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
        {loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : projects.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project._id} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20">
                <h3 className="text-white font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  {project.description || "No description provided"}
                </p>
                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <p>Created by: {project.createdBy?.name || "Unknown"}</p>
                  <p>Members: {project.members?.length || 0}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-10 text-center text-gray-400">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
