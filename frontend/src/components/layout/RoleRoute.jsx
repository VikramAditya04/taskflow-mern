import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoadingComponent() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

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
  const { user, token, isInitialized } = useAuth();

  // Show loading while initializing
  if (!isInitialized) {
    return <LoadingComponent />;
  }

  // Not logged in - redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has valid role
  if (!user.role) {
    console.warn("User has no role assigned");
    return <AccessDenied />;
  }

  // Render based on role
  if (user.role === "admin") {
    return admin;
  }

  if (user.role === "member") {
    return member;
  }

  // Invalid role
  console.warn("User has invalid role:", user.role);
  return <AccessDenied />;
}
