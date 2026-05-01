import { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const linkBase =
  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition cursor-pointer";
const linkActive = "bg-white/10 text-white border border-white/10";
const linkInactive = "text-gray-400 hover:text-white hover:bg-white/5";

export default function Sidebar({ variant = "admin" }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initial = useMemo(() => {
    return user?.name?.trim()?.charAt(0)?.toUpperCase() || "A";
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-md min-h-screen sticky top-0">
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white flex items-center justify-center font-bold transition group-hover:opacity-90">
            {initial}
          </div>
          <div>
            <p className="text-white font-semibold">TaskFlow</p>
            <p className="text-xs text-gray-400">
              {variant === "admin" ? "Admin Panel" : "Member Panel"}
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <FaProjectDiagram />
          Projects
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <FaTasks />
          Tasks
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-4">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm text-white">{user?.name || "Admin"}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
          <div
            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs ${
              user?.role === "admin"
                ? "border-red-500/30 bg-red-500/20 text-red-400"
                : "border-blue-500/30 bg-blue-500/20 text-blue-400"
            }`}
          >
            {user?.role === "admin" ? "Admin" : "Member"}
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:opacity-80 cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
