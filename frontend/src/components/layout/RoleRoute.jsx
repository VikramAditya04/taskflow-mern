import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AccessDenied() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">Access Denied</h1>
        <p className="mt-3 text-gray-400">
          You do not have permission to access this section.
        </p>
      </div>
    </div>
  );
}

export default function RoleRoute({ admin, member }) {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") {
    return admin;
  }

  if (user?.role === "member") {
    return member;
  }

  return <AccessDenied />;
}
