import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    try {
      // Send signup request
      const response = await api.post("/auth/register", formData);
      console.log("✅ Signup response received:", response.status, response.data);
      
      // Extract token and user from response
      const { token, user } = response.data;
      console.log("Token:", token);
      console.log("User:", user);

      // Validate token exists
      if (!token) {
        console.error("❌ No token in response");
        toast.error("No authentication token received");
        setLoading(false);
        return;
      }

      // Validate user data exists
      if (!user || !user.id) {
        console.error("❌ No user data in response");
        toast.error("No user data received");
        setLoading(false);
        return;
      }

      // Ensure user has a role (default to member if not provided)
      const userWithRole = {
        ...user,
        role: user.role || "member"
      };

      // Save to auth context (saves to localStorage automatically)
      login(token, userWithRole);
      console.log("✅ Saved to auth context with user role:", userWithRole.role);

      // Show success message
      toast.success(`Account created! Welcome, ${userWithRole.name}!`);

      // Navigate to dashboard - use direct navigation since localStorage is already updated
      console.log("Navigating to dashboard...");
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("❌ Signup error:", error);
      
      // Get error message from response
      const errorMsg = 
        error.response?.data?.message || 
        error.response?.statusText ||
        error.message || 
        "Signup failed";
      
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: errorMsg
      });
      
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start managing projects and tasks with TaskFlow"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm text-gray-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm text-gray-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-400"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            placeholder="Create a password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white font-semibold py-3 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-white hover:underline cursor-pointer">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
