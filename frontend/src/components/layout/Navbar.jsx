import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBars, FaTimes, FaTasks, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
    setIsOpen(false);
  };

  const firstLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 rounded-lg transition group-hover:opacity-90">
              <FaTasks className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">
              TaskFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Features
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Projects
                </Link>
                <Link
                  to="/tasks"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Tasks
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Area */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-white border border-white/30 rounded-lg hover:opacity-80 transition-all duration-300 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 cursor-pointer"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <span
                  className={`rounded-full px-3 py-1 text-sm border ${
                    isAdmin
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}
                >
                  {isAdmin ? "Admin" : "Member"}
                </span>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white font-semibold flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  title={user.name}
                >
                  {firstLetter}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-5 py-2 text-white border border-white/30 rounded-lg hover:opacity-80 transition cursor-pointer"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            {!user ? (
              <>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <a
                  href="#features"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Features
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/tasks"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Tasks
                </Link>
              </>
            )}
            <div className="flex gap-3 pt-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="flex-1 px-4 py-2 text-white border border-white/30 rounded-lg hover:opacity-80 transition-all text-center cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 px-4 py-2 bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white rounded-lg font-medium hover:opacity-90 transition-all text-center cursor-pointer"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className={`flex-1 rounded-full px-3 py-2 text-center text-sm border ${
                      isAdmin
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {isAdmin ? "Admin" : "Member"}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 text-white border border-white/30 rounded-lg hover:opacity-80 transition-all text-center cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
