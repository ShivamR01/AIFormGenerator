import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  Wand2,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Layers,
  BarChart2,
  Eye,
  Edit,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export function Home() {
  const { user } = useAuth();

  // ================= DASHBOARD DATA =================
  const [dashboardData, setDashboardData] = useState({
    totalForms: 0,
    activeForms: 0,
    totalSubmissions: 0,
  });
  const [recentForms, setRecentForms] = useState<
    { id: string; title: string; is_public: boolean; submissions: number }[]
  >([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoadingDashboard(true);

        const { data: forms, error: formsError } = await supabase
          .from("forms")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (formsError) throw formsError;

        const activeForms = forms?.filter((f) => f.is_public)?.length || 0;
        const formIds = forms?.map((f) => f.id) || [];

        let totalSubmissions = 0;
        const submissionsMap: Record<string, number> = {};

        if (formIds.length > 0) {
          for (const formId of formIds) {
            const { count } = await supabase
              .from("submissions")
              .select("*", { count: "exact", head: true })
              .eq("form_id", formId);
            submissionsMap[formId] = count || 0;
            totalSubmissions += count || 0;
          }
        }

        setDashboardData({
          totalForms: forms?.length || 0,
          activeForms,
          totalSubmissions,
        });

        // Only show 3 latest forms
        setRecentForms(
          forms?.slice(0, 3).map((f) => ({
            id: f.id,
            title: f.title,
            is_public: f.is_public,
            submissions: submissionsMap[f.id] || 0,
          })) || []
        );
      } catch (err: any) {
        console.error("Failed to load dashboard data:", err.message);
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-slate-100 text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 opacity-10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
              <Wand2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 mb-6">
              {user
                ? `Welcome Back, ${user.user_metadata?.name || user.email}`
                : "AI-Powered Form Generator"}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              {user
                ? "Access your forms, track submissions, and get insights instantly."
                : "Transform your workflow with AI. Describe your form — we build it instantly, securely, and beautifully."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl hover:scale-105 hover:shadow-xl transition-all font-semibold text-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 py-3 px-8 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all font-semibold text-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
              {user && (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-8 rounded-xl hover:scale-105 hover:shadow-xl transition-all font-semibold text-lg"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= DASHBOARD CARDS ================= */}
      {user && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Dashboard Overview
          </h2>
          {loadingDashboard ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center"
                >
                  <Zap className="w-8 h-8 text-blue-600 mb-4" />
                  <p className="text-gray-500 mb-2">Total Forms</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {dashboardData.totalForms}
                  </h3>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center"
                >
                  <Shield className="w-8 h-8 text-green-600 mb-4" />
                  <p className="text-gray-500 mb-2">Submissions</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {dashboardData.totalSubmissions}
                  </h3>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center"
                >
                  <TrendingUp className="w-8 h-8 text-amber-600 mb-4" />
                  <p className="text-gray-500 mb-2">Active Forms</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {dashboardData.activeForms}
                  </h3>
                </motion.div>
              </div>

              {/* ================= RECENT FORMS ================= */}
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Recent Forms
              </h3>
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                {recentForms.map((f) => (
                  <motion.div
                    key={f.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                      <p className="text-gray-500 mb-4">
                        {f.is_public ? "Public" : "Private"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BarChart2 className="w-5 h-5" /> {f.submissions} submissions
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/form/${f.id}`}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" /> View
                        </Link>
                        <Link
                          to={`/edit/${f.id}`}
                          className="text-green-600 hover:underline flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          {user ? "Premium Features for You" : "Why Choose Us"}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-7 h-7 text-blue-600" />,
              title: "Fast Form Generation",
              desc: "AI generates fully functional forms instantly with field validation and styling.",
              bg: "from-blue-100 to-blue-50",
            },
            {
              icon: <Shield className="w-7 h-7 text-green-600" />,
              title: "Data Security",
              desc: "Enterprise-grade security, encrypted storage, and private forms for peace of mind.",
              bg: "from-green-100 to-green-50",
            },
            {
              icon: <TrendingUp className="w-7 h-7 text-amber-600" />,
              title: "Insights & Analytics",
              desc: "Track submissions, view charts, and export results in real-time.",
              bg: "from-amber-100 to-amber-50",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className={`bg-gradient-to-b ${f.bg} rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300`}
            >
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-700 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Globe className="w-10 h-10 mx-auto mb-4 text-blue-600" />
          <h2 className="text-4xl font-bold mb-10">Loved by Teams Worldwide</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Mehta",
                role: "Startup Founder",
                quote:
                  "This app saved us weeks of development time. It’s like having a full frontend engineer powered by AI.",
              },
              {
                name: "Sara Liu",
                role: "Product Manager",
                quote:
                  "The simplicity and power are unmatched. Our forms are up and running in minutes, not days.",
              },
              {
                name: "James Patel",
                role: "Developer",
                quote:
                  "I never thought generating dynamic forms could be this smooth. Absolute game-changer!",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all"
              >
                <Layers className="w-6 h-6 text-blue-600 mb-4" />
                <p className="text-gray-700 mb-4 italic">“{t.quote}”</p>
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
