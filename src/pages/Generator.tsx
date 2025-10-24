import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { FormRenderer } from "../components/FormRenderer";
import {
  Wand2,
  Save,
  ArrowLeft,
  FileText,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormSchema } from "../lib/supabase";

export function Generator() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGenerating(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-form`;
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate form");
      }

      const data = await response.json();
      setSchema(data.schema);
      setFormTitle(prompt.split(" ").slice(0, 5).join(" "));
    } catch (err: any) {
      setError(err.message || "Failed to generate form");
    } finally {
      setGenerating(false);
    }
  };

 const handleSave = async () => {
  if (!schema || !user || !formTitle) return;

  setSaving(true);
  setError("");

  try {
    const { data, error: insertError } = await supabase.from("forms").insert({
      user_id: user.id,
      title: formTitle,
      description: formDescription,
      schema,
      is_public: true,
    });

    if (insertError) throw insertError;

    // Optional: show success briefly
    setError("Form saved successfully!");

    // Small delay so user sees message
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Force refresh to dashboard
    window.location.href = "/dashboard";
  } catch (err: any) {
    console.error("Save Form Error:", err);
    setError(err.message || "Failed to save form");
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-blue-200 opacity-40 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-indigo-300 opacity-40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Header / Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>

          {/* Powered by Gemini */}
          <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/40 shadow-sm">
            <img
              src="src/assets/gemini-color.svg"
              alt="Gemini Logo"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Powered by Gemini
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-sm">
            AI Form Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3">
            Instantly create smart, dynamic, and interactive forms from a single prompt.
            Customize, preview, and publish — all in one click.
          </p>
        </motion.div>

        {/* Prompt Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/30"
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 p-3 rounded-xl mr-4 shadow-lg">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Describe Your Form</h2>
              <p className="text-gray-600 text-sm">
                The more details you include, the better the AI will design it.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A feedback form with name, email, rating (1–5 stars), and comments."
              rows={4}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 shadow-sm"
            />

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={generating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center"
            >
              {generating ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Generating Form...
                </>
              ) : (
                <>
                  <Wand2 size={20} className="mr-2" />
                  Generate Form
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Generated Form Preview */}
        <AnimatePresence>
          {schema && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30"
            >
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Preview & Save</h2>
              </div>

              {/* Title and Description */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Form Title
                  </label>
                  <input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter form title"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Form Description
                  </label>
                  <input
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Optional description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Form Preview */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
                  <FormRenderer
                    fields={schema.fields}
                    onSubmit={() => {}}
                    submitLabel="Preview Submit"
                    isSubmitting={false}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving || !formTitle}
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center shadow-lg transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Saving Form...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Form
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip Section */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>
            💡 Tip: Try prompts like “Job Application Form”, “Customer Feedback Form”, or
            “Event Registration with Payment Option” to explore the generator’s power.
          </p>
        </div>
      </div>
    </div>
  );
}
