import TaskCard from "./TaskCard";

const columns = ["todo", "in-progress", "done"];

const columnTitles = {
  todo: "Todo",
  "in-progress": "In Progress",
  done: "Done",
};

export default function KanbanBoard({ tasks, onStatusChange, loadingTaskId }) {
  const groupedTasks = columns.reduce((accumulator, status) => {
    accumulator[status] = tasks.filter((task) => task.status === status);
    return accumulator;
  }, {});

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {columns.map((status) => (
        <div key={status} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-white font-semibold">{columnTitles[status]}</h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              {groupedTasks[status].length}
            </span>
          </div>

          <div className="space-y-4">
            {groupedTasks[status].length ? (
              groupedTasks[status].map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={onStatusChange}
                  loading={loadingTaskId === task._id}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-gray-400">
                No tasks in {columnTitles[status].toLowerCase()}.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
