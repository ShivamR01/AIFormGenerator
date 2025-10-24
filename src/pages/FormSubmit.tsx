// src/pages/FormSubmit.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FormRenderer } from '../components/FormRenderer';
import { CheckCircle, Home, ArrowLeft, Loader2 } from 'lucide-react';
import type { Form } from '../lib/supabase';

export function FormSubmit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadForm();
  }, [id]);

  const loadForm = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('id', id)
        .eq('is_public', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError('Form not found or is no longer accepting submissions.');
      } else {
        setForm(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load form');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    setSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('submissions')
        .insert({ form_id: id, data });

      if (submitError) throw submitError;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-700 font-medium animate-pulse">
          Loading your form...
        </p>
      </div>
    );
  }

  // ================= ERROR STATE =================
  if (error && !form) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Home className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Form Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-medium"
          >
            <Home size={20} className="mr-2" />
            Go Home
          </Link>
        </div>
      </motion.div>
    );
  }

  // ================= SUBMITTED STATE =================
  if (submitted) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full text-center"
        >
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8">
            Your response has been submitted successfully.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              window.scrollTo(0, 0);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-medium"
          >
            Submit Another Response
          </button>
        </motion.div>
      </motion.div>
    );
  }

  if (!form) return null;

  // ================= FORM RENDER =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-700 hover:text-gray-900 mb-6 transition-all font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* FORM HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-gray-600 text-lg">{form.description}</p>
            )}
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 shadow-inner">
              {error}
            </div>
          )}

          {/* FORM RENDERER */}
          <FormRenderer
            fields={form.schema.fields}
            onSubmit={handleSubmit}
            submitLabel={submitting ? 'Submitting...' : 'Submit Response'}
            isSubmitting={submitting}
            onProgressChange={setProgress} // optional prop if supported
          />

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 tracking-wide">
              Powered by{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Form Generator
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
