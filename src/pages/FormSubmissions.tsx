import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Submission, Form as FormType } from '../lib/supabase';
import { ArrowLeft, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnalyticsCharts } from '../components/AnalyticsCharts';

export function FormSubmissions() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormType | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');

  // Load form and submissions
  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: formData, error: formError } = await supabase
          .from('forms')
          .select('*')
          .eq('id', id)
          .single();
        if (formError) throw formError;
        if (!mounted) return;
        setForm(formData as FormType);

        const { data: subsData, error: subsError } = await supabase
          .from('submissions')
          .select('*')
          .eq('form_id', id)
          .order('created_at', { ascending: false })
          .range((page - 1) * pageSize, page * pageSize - 1);
        if (subsError) throw subsError;
        if (!mounted) return;
        setSubmissions(subsData as Submission[] || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load submissions');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [id, page, pageSize]);

  // CSV download
  const downloadCSV = () => {
    if (!submissions || submissions.length === 0) return;
    const rows = submissions.map((s) => ({
      id: s.id,
      created_at: s.created_at,
      user_id: s.user_id,
      data: JSON.stringify(s.data),
    }));
    const csv = [
      Object.keys(rows[0]).join(','),
      ...rows.map((r) =>
        Object.values(r)
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form?.title || 'submissions'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter submissions by search query
  const filteredSubmissions = useMemo(
    () => submissions.filter((s) =>
      JSON.stringify(s.data).toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [submissions, searchQuery]
  );

  // Submission analytics
  const submissionTrends = useMemo(() => {
    const trends: Record<string, number> = {};
    submissions.forEach((s) => {
      const date = new Date(s.created_at).toLocaleDateString();
      trends[date] = (trends[date] || 0) + 1;
    });
    return Object.entries(trends)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [submissions]);

  const topFields = useMemo(() => {
    const counts: Record<string, number> = {};
    submissions.forEach((s) => {
      Object.keys(s.data).forEach((key) => {
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([field, count]) => ({ field, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [submissions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200 transition">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{form?.title || 'Form Submissions'}</h1>
              {form?.description && <p className="text-gray-500 mt-1 text-sm sm:text-base">{form.description}</p>}
            </div>
          </div>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-5 py-2.5 rounded-xl shadow hover:from-blue-700 hover:to-indigo-700 transition text-sm sm:text-base mt-3 md:mt-0"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-12">
          {[
            { label: 'Total Submissions', value: submissions.length, color: 'text-blue-600' },
            { label: 'Unique Users', value: [...new Set(submissions.map(s => s.user_id))].length, color: 'text-indigo-600' },
            { label: 'Fields', value: form?.schema.fields.length || 0, color: 'text-green-600' },
            { label: 'Latest Submission', value: submissions[0] ? new Date(submissions[0].created_at).toLocaleDateString() : '-', color: 'text-purple-600' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center hover:shadow-xl transition">
              <div className="text-gray-400 text-xs sm:text-sm font-semibold">{card.label}</div>
              <div className={`text-2xl sm:text-3xl font-bold ${card.color}`}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm text-sm sm:text-base"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Submissions Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse space-y-2 w-full max-w-6xl">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 sm:h-12 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded">No submissions found.</div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-x-auto mb-8 md:mb-12">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {['Date', 'Submitter', ''].map((th, i) => (
                    <th
                      key={i}
                      className="text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSubmissions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">{new Date(s.created_at).toLocaleString()}</td>
                    <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">{s.user_id || 'Guest'}</td>
                    {/* <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 truncate max-w-xs sm:max-w-lg">
                      {Object.entries(s.data).map(([key, value]) => (
                        <span key={key} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 mr-1 mb-1 rounded-full text-xs sm:text-sm font-medium">
                          {key}: {String(value)}
                        </span>
                      ))}
                    </td> */}
                    <td className="px-4 sm:px-6 py-2 sm:py-3 text-right">
                      <Link
                        to={`/form/${id}/submissions/${s.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition text-sm sm:text-base"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 border-t gap-2 sm:gap-0">
              <div className="text-sm sm:text-base text-gray-500">Page {page}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 sm:px-3 sm:py-2 bg-gray-100 rounded hover:bg-gray-200 transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 sm:px-3 sm:py-2 bg-gray-100 rounded hover:bg-gray-200 transition flex items-center gap-1 text-xs sm:text-sm"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Charts */}
        <AnalyticsCharts submissionTrends={submissionTrends} topFields={topFields} />

      </div>
    </div>
  );
}
