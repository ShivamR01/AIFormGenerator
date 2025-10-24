import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/auth";
import { FormCard } from "../components/FormCard";
import { DashboardCharts } from "../components/DashboardCharts";
import {
  Plus,
  LogOut,
  Wand2,
  Search,
  BarChart2,
  Layers,
  Zap,
} from "lucide-react";
import type { Form } from "../lib/supabase";

type SubmissionFilter = "all" | "0" | "1-5" | "6-20" | "21+";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [forms, setForms] = useState<(Form & { submissionCount: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState<
    "latest" | "oldest" | "mostSubmissions" | "leastSubmissions" | "alphabetical"
  >("latest");
  const [submissionFilter, setSubmissionFilter] = useState<SubmissionFilter>("all");

  // Load forms
  useEffect(() => {
    if (user) loadForms();
  }, [user]);

  const loadForms = async () => {
    if (!user) return;
    try {
      const { data: formsData, error: formsError } = await supabase
        .from("forms")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (formsError) throw formsError;

      const formsWithCounts = await Promise.all(
        (formsData || []).map(async (form) => {
          const { count } = await supabase
            .from("submissions")
            .select("*", { count: "exact", head: true })
            .eq("form_id", form.id);
          return { ...form, submissionCount: count || 0 };
        })
      );
      setForms(formsWithCounts);
    } catch (err: any) {
      setError(err.message || "Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId: string) => {
    try {
      const { error } = await supabase.from("forms").delete().eq("id", formId);
      if (error) throw error;
      setForms((prev) => prev.filter((f) => f.id !== formId));
    } catch (err: any) {
      setError(err.message || "Failed to delete form");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
    }
  };

  // Derived data (optimized with useMemo)
  const filteredForms = useMemo(() => {
    return forms
      .filter((f) => f.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((f) => {
        switch (submissionFilter) {
          case "0":
            return f.submissionCount === 0;
          case "1-5":
            return f.submissionCount >= 1 && f.submissionCount <= 5;
          case "6-20":
            return f.submissionCount >= 6 && f.submissionCount <= 20;
          case "21+":
            return f.submissionCount >= 21;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        switch (filterOption) {
          case "latest":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case "oldest":
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          case "mostSubmissions":
            return b.submissionCount - a.submissionCount;
          case "leastSubmissions":
            return a.submissionCount - b.submissionCount;
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [forms, searchQuery, submissionFilter, filterOption]);

  const totalSubmissions = useMemo(
    () => forms.reduce((acc, f) => acc + f.submissionCount, 0),
    [forms]
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-b-4 border-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2 rounded-xl shadow-md">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm opacity-90">
                {user?.user_metadata?.name || user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Forms",
            value: forms.length,
            icon: <Layers className="text-blue-600 w-7 h-7" />,
            gradient: "from-blue-100 to-blue-50",
          },
          {
            label: "Total Submissions",
            value: totalSubmissions,
            icon: <BarChart2 className="text-indigo-600 w-7 h-7" />,
            gradient: "from-indigo-100 to-indigo-50",
          },
          {
            label: "Recent Activity",
            value:
              forms.length > 0
                ? new Date(forms[0].created_at).toLocaleDateString()
                : "No Activity",
            icon: <Zap className="text-violet-600 w-7 h-7" />,
            gradient: "from-violet-100 to-violet-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl shadow-md flex items-center space-x-4 hover:scale-105 transition-transform duration-200`}
          >
            <div className="p-3 bg-white rounded-xl shadow-inner">{stat.icon}</div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <DashboardCharts forms={forms} />
      </div>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value as any)}
            className="py-3 px-4 rounded-xl border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="mostSubmissions">Most Submissions</option>
            <option value="leastSubmissions">Least Submissions</option>
            <option value="alphabetical">Alphabetical</option>
          </select>

          <select
            value={submissionFilter}
            onChange={(e) => setSubmissionFilter(e.target.value as SubmissionFilter)}
            className="py-3 px-4 rounded-xl border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="all">All Submissions</option>
            <option value="0">0 Submissions</option>
            <option value="1-5">1–5 Submissions</option>
            <option value="6-20">6–20 Submissions</option>
            <option value="21+">21+ Submissions</option>
          </select>
        </div>

        <Link
          to="/generator"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg flex items-center justify-center transition-all"
        >
          <Plus size={20} className="mr-2" />
          Create Form
        </Link>
      </section>

      {/* Forms Section */}
      <section className="max-w-7xl mx-auto px-6 mt-10 pb-24">
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-inner">
            {error}
          </div>
        )}

        {filteredForms.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center mt-8">
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Wand2 className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Forms Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first AI-powered form in seconds and start collecting
              responses effortlessly.
            </p>
            <Link
              to="/generator"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg"
            >
              <Plus size={20} className="mr-2" />
              Create Form
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredForms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                submissionCount={form.submissionCount}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <Link
        to="/generator"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
