
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./components/layout/AdminLayout";
import RoleRoute from "./components/layout/RoleRoute";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";
import Tasks from "./pages/Tasks";
import MyTasks from "./pages/MyTasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-slate-950 min-h-screen">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <RoleRoute
                  admin={
                    <AdminLayout variant="admin">
                      <AdminDashboard />
                    </AdminLayout>
                  }
                  member={
                    <AdminLayout variant="member">
                      <MemberDashboard />
                    </AdminLayout>
                  }
                />
              }
            />
            <Route
              path="/projects"
              element={
                <RoleRoute
                  admin={
                    <AdminLayout variant="admin">
                      <Projects />
                    </AdminLayout>
                  }
                  member={
                    <AdminLayout variant="member">
                      <MyProjects />
                    </AdminLayout>
                  }
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <RoleRoute
                  admin={
                    <AdminLayout variant="admin">
                      <Tasks />
                    </AdminLayout>
                  }
                  member={
                    <AdminLayout variant="member">
                      <MyTasks />
                    </AdminLayout>
                  }
                />
              }
            />
            <Route path="/task" element={<Navigate to="/tasks" replace />} />
            <Route
              path="/admin/dashboard"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/admin/projects"
              element={<Navigate to="/projects" replace />}
            />
            <Route
              path="/admin/tasks"
              element={<Navigate to="/tasks" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={2500} theme="dark" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
