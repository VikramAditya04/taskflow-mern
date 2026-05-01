export default function StatusBadge({ status }) {
  const styles = {
    todo: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    done: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  const labelMap = {
    todo: "Todo",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status] || styles.todo}`}
    >
      {labelMap[status] || status}
    </span>
  );
}
