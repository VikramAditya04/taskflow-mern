import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute() {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-white">Access Denied</h1>
          <p className="mt-3 text-gray-400">
            This area is restricted to admin users only.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
