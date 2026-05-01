export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-500/12 via-violet-500/10 to-rose-500/12 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-8 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
