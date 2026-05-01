export default function DashboardCard({ title, value, description, tone = "indigo" }) {
  const toneStyles = {
    indigo: "from-indigo-500/20 to-indigo-500/5 text-indigo-300 border-indigo-500/20",
    violet: "from-violet-500/20 to-violet-500/5 text-violet-300 border-violet-500/20",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-300 border-rose-500/20",
    cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-500/20",
  };

  return (
    <div className={`rounded-xl border ${toneStyles[tone]} bg-white/5 backdrop-blur-md p-5 shadow-lg`}>
      <p className="text-sm text-gray-400">{title}</p>
      <div className="mt-3 text-3xl font-bold text-white">{value}</div>
      {description ? <p className="mt-2 text-sm text-gray-400">{description}</p> : null}
    </div>
  );
}
