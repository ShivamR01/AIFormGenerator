import { useEffect, useState } from 'react';
import { supabase, Submission, Form } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Submissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [formsMap, setFormsMap] = useState<Record<string, Form['id'] | string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const { data: formsData, error: formsError } = await supabase
          .from('forms')
          .select('id,title')
          .order('created_at', { ascending: false });

        if (formsError) throw formsError;

        const map: Record<string, string> = {};
        formsData?.forEach((f: any) => { map[f.id] = f.title; });

        if (!mounted) return;
        setFormsMap(map);

        const { data: submissionsData, error: submissionsError } = await supabase
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(200);

        if (submissionsError) throw submissionsError;
        if (!mounted) return;
        setSubmissions(submissionsData || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load submissions');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* ===== Header with Back Arrow ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Form Submissions</h1>
        </div>
        <p className="text-sm text-gray-500 mt-2 sm:mt-0">Viewing submissions for forms you can access</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>
      ) : submissions.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded">No submissions found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formsMap[s.form_id] || s.form_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.user_id || 'Guest'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">{JSON.stringify(s.data)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/form/${s.form_id}/submissions/${s.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
