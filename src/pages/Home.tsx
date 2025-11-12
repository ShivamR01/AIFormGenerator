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
  ArrowRight, // A better icon for "Get Started"
  Loader2, // A more modern loader
} from "lucide-react";
import { supabase } from "../lib/supabase";

// A new, reusable "glass card" component for a premium feel
const GlassCard = ({ children, className, whileHover = {} }: any) => (
  <motion.div
    whileHover={whileHover}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

export function Home() {
  const { user } = useAuth();

  // ================= DASHBOARD DATA =================
  // This logic is UNCHANGED, as requested.
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

  // Animation variants for futuristic feel
  const cardHover = { scale: 1.03, transition: { duration: 0.3 } };
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* ================= FUTURISTIC AURORA BG ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-20rem] top-[-10rem] h-[40rem] w-[60rem] rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-20 blur-3xl" />
        <div className="absolute right-[-15rem] top-[15rem] h-[30rem] w-[50rem] rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 opacity-10 blur-3xl" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/50 bg-blue-500/10 shadow-lg">
            <Wand2 className="h-10 w-10 text-blue-300" />
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">
            {user
              ? `Welcome Back, ${user.user_metadata?.name || user.email}`
              : "AI-Powered Form Generator"}
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-300 md:text-xl">
            {user
              ? "Access your forms, track submissions, and get insights instantly."
              : "Transform your workflow with AI. Describe your form — we build it instantly, securely, and beautifully."}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {!user && (
              <>
                <Link
                  to="/signup"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-[0_0_20px_theme(colors.blue.500/50)] transition-all hover:scale-105 hover:shadow-2xl"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Sign In
                </Link>
              </>
            )}
            {user && (
              <Link
                to="/dashboard"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 px-8 py-3 text-lg font-semibold text-white shadow-[0_0_20px_theme(colors.green.500/50)] transition-all hover:scale-105 hover:shadow-2xl"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* ================= CURVED & SHAPED SECTION WRAPPER ================= */}
      {/* This creates the premium "curved edge" that overlaps the hero */}
      <div className="relative z-10 mt-[-50px] rounded-t-[50px] bg-gray-900/50 pb-24 backdrop-blur-md">
        {/* ================= DASHBOARD CARDS (User Only) ================= */}
        {user && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
              Dashboard Overview
            </h2>
            {loadingDashboard ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              </div>
            ) : (
              <>
                <div className="mb-12 grid gap-6 md:grid-cols-3">
                  <GlassCard
                    whileHover={cardHover}
                    className="p-6 text-center"
                  >
                    <Zap className="mx-auto h-8 w-8 text-blue-400" />
                    <p className="mt-4 text-gray-400">Total Forms</p>
                    <h3 className="text-3xl font-bold">
                      {dashboardData.totalForms}
                    </h3>
                  </GlassCard>
                  <GlassCard
                    whileHover={cardHover}
                    className="p-6 text-center"
                  >
                    <Shield className="mx-auto h-8 w-8 text-green-400" />
                    <p className="mt-4 text-gray-400">Submissions</p>
                    <h3 className="text-3xl font-bold">
                      {dashboardData.totalSubmissions}
                    </h3>
                  </GlassCard>
                  <GlassCard
                    whileHover={cardHover}
                    className="p-6 text-center"
                  >
                    <TrendingUp className="mx-auto h-8 w-8 text-amber-400" />
                    <p className="mt-4 text-gray-400">Active Forms</p>
                    <h3 className="text-3xl font-bold">
                      {dashboardData.activeForms}
                    </h3>
                  </GlassCard>
                </div>

                {/* ================= RECENT FORMS (User Only) ================= */}
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Recent Forms
                </h3>
                <div className="grid gap-6 lg:grid-cols-3">
                  {recentForms.map((f) => (
                    <GlassCard
                      key={f.id}
                      whileHover={cardHover}
                      className="flex flex-col justify-between p-6"
                    >
                      <div>
                        <h4 className="mb-2 truncate text-xl font-bold">
                          {f.title}
                        </h4>
                        <span
                          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            f.is_public
                              ? "bg-green-500/20 text-green-300"
                              : "bg-gray-700/50 text-gray-300"
                          }`}
                        >
                          {f.is_public ? "Public" : "Private"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                          <BarChart2 className="h-5 w-5" /> {f.submissions}{" "}
                          submissions
                        </div>
                        <div className="flex gap-3">
                          <Link
                            to={`/form/${f.id}`}
                            className="flex items-center gap-1 text-blue-400 transition-colors hover:text-blue-300"
                          >
                            <Eye className="h-4 w-4" /> View
                          </Link>
                          <Link
                            to={`/edit/${f.id}`}
                            className="flex items-center gap-1 text-green-400 transition-colors hover:text-green-300"
                          >
                            <Edit className="h-4 w-4" /> Edit
                          </Link>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* ================= FEATURES (Always Show) ================= */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            {user ? "Premium Features for You" : "Why Choose Us"}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Zap className="h-7 w-7 text-blue-400" />,
                title: "Fast Form Generation",
                desc: "AI generates fully functional forms instantly with field validation and styling.",
              },
              {
                icon: <Shield className="h-7 w-7 text-green-400" />,
                title: "Data Security",
                desc: "Enterprise-grade security, encrypted storage, and private forms for peace of mind.",
              },
              {
                icon: <TrendingUp className="h-7 w-7 text-amber-400" />,
                title: "Insights & Analytics",
                desc: "Track submissions, view charts, and export results in real-time.",
              },
            ].map((f) => (
              <GlassCard key={f.title} whileHover={cardHover} className="p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold">{f.title}</h3>
                <p className="leading-relaxed text-gray-300">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS (Always Show) ================= */}
        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <Globe className="mx-auto mb-4 h-10 w-10 text-blue-400" />
          <h2 className="mb-10 text-4xl font-bold">Loved by Teams Worldwide</h2>

          <div className="grid gap-8 md:grid-cols-3">
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
              <GlassCard
                key={t.name}
                whileHover={cardHover}
                className="p-8 text-left"
              >
                <Layers className="mb-4 h-6 w-6 text-blue-400" />
                <p className="mb-4 italic text-gray-300">“{t.quote}”</p>
                <h4 className="font-semibold text-white">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.role}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
