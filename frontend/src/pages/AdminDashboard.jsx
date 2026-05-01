import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard");
        const nextStats = response.data?.stats || response.data || {};

        if (isMounted) {
          setStats({
            totalTasks: nextStats.totalTasks || 0,
            completedTasks: nextStats.completedTasks || 0,
            pendingTasks: nextStats.pendingTasks || 0,
            overdueTasks: nextStats.overdueTasks || 0,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Monitor tasks, completion status, and overdue work across your team.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-gray-400">
          Loading dashboard stats...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard title="Total Tasks" value={stats.totalTasks} tone="indigo" />
          <DashboardCard title="Completed Tasks" value={stats.completedTasks} tone="violet" />
          <DashboardCard title="Pending Tasks" value={stats.pendingTasks} tone="cyan" />
          <DashboardCard title="Overdue Tasks" value={stats.overdueTasks} tone="rose" />
        </div>
      )}
    </div>
  );
}
