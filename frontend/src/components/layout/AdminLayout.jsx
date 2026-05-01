import { Outlet } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTasks } from "react-icons/fa";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({ variant = "admin", children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-500/12 via-violet-500/10 to-rose-500/12 bg-slate-950 text-white lg:flex">
      <Sidebar variant={variant} />
      <div className="lg:hidden sticky top-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto">
          <Link to="/" className="inline-flex items-center gap-2 whitespace-nowrap cursor-pointer group">
            <div className="w-9 h-9 rounded-lg bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white transition group-hover:opacity-90">
              <FaTasks />
            </div>
            <span className="text-sm font-semibold text-white">TaskFlow</span>
          </Link>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                isActive ? "bg-white/15 text-white" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                isActive ? "bg-white/15 text-white" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                isActive ? "bg-white/15 text-white" : "text-gray-400 hover:text-white"
              }`
            }
          >
            Tasks
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:opacity-80 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:ml-0">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
