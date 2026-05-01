import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      const response = await api.post("/auth/login", formData);
      const token = response.data?.token;
      const user = response.data?.user;

      if (token && user) {
        login(token, user);
      }

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid credentials";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to TaskFlow"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white font-semibold py-3 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-white hover:underline cursor-pointer">
          Signup
        </Link>
      </p>
    </AuthLayout>
  );
}
