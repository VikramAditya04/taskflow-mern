import StatusBadge from "./StatusBadge";

function PriorityBadge({ priority }) {
  const colorMap = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold border ${
        colorMap[priority] || colorMap.medium
      }`}
    >
      {priority?.charAt(0).toUpperCase() + priority?.slice(1) || "Medium"}
    </span>
  );
}

export default function TaskCard({ task, onStatusChange, loading }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-lg transition hover:border-white/20">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{task.title}</h3>
            <p className="mt-2 text-sm text-gray-400">
              {task.description || "No description provided"}
            </p>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
          <p>
            Project: <span className="text-white">{task.projectId?.name || "Unknown"}</span>
          </p>
          <p>
            Assigned to: <span className="text-white">{task.assignedTo?.name || "Unknown"}</span>
          </p>
          <p>
            Due date: <span className="text-white">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
          </p>
        </div>

        {onStatusChange ? (
          <div className="flex items-center gap-3">
            <select
              value={task.status}
              onChange={(event) => onStatusChange(task._id, event.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-70"
            >
              <option value="todo" className="bg-slate-900">Todo</option>
              <option value="in-progress" className="bg-slate-900">In Progress</option>
              <option value="done" className="bg-slate-900">Done</option>
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
}
