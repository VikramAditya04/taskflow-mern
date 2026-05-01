import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";

export default function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-500/12 via-violet-500/10 to-rose-500/12 bg-slate-950">
      <Navbar />
      <Hero />
    </div>
  );
}
