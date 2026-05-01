import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import {
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  const primaryTarget = user ? "/dashboard" : "/signup";
  const secondaryTarget = user ? "/tasks" : "#features";

  return (
    <section className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Now available for teams</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Manage Tasks
                <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 bg-clip-text text-transparent">
                  {" "}
                  Smarter
                </span>
                , Not Harder
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                TaskFlow helps teams collaborate, assign tasks, and track
                progress effortlessly. Streamline your workflow with role-based
                access and real-time dashboards.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={primaryTarget}
                className="group px-8 py-3 bg-linear-to-r from-indigo-500 via-violet-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {user ? "Go to Dashboard" : "Get Started"}
                <FaArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to={secondaryTarget}
                className="px-8 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/5 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaPlay size={16} />
                {user ? "View Tasks" : "Learn More"}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  10K+
                </div>
                <p className="text-sm text-gray-400">Teams using TaskFlow</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  99.9%
                </div>
                <p className="text-sm text-gray-400">Uptime guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glowing gradient background */}
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 via-violet-500/20 to-rose-500/20 rounded-3xl blur-3xl"></div>

              {/* Feature cards grid */}
              <div className="relative space-y-4">
                {/* Card 1 */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
                      <FaCheckCircle className="text-indigo-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Easy Task Management
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Create & assign tasks instantly
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-500/20 rounded-xl group-hover:bg-violet-500/30 transition-colors">
                      <FaUsers className="text-violet-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Team Collaboration
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Work together seamlessly
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-500/20 rounded-xl group-hover:bg-rose-500/30 transition-colors">
                      <FaClock className="text-rose-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Real-time Updates
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Stay updated on progress
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
                      <FaChartLine className="text-cyan-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Analytics Dashboard
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Track performance metrics
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
