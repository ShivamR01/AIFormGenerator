import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase, Submission, Form as FormType } from '../lib/supabase';
import {
  ArrowLeft,
  Download,
  Code,
  Grid,
  List,
  ChevronDown,
  Copy,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

type ViewMode = 'fields' | 'json' | 'table';
type FileFormat = 'json' | 'csv' | 'xls' | 'txt';

export function SubmissionDetail() {
  const { id, submissionId } = useParams<{ id: string; submissionId: string }>();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [form, setForm] = useState<FormType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('fields');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copyDropdownOpen, setCopyDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch submission & form
  useEffect(() => {
    if (!id || !submissionId) return;
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: subData, error: subErr } = await supabase
          .from('submissions')
          .select('*')
          .eq('id', submissionId)
          .single();
        if (subErr) throw subErr;
        if (!mounted) return;
        setSubmission(subData as Submission);

        const { data: formData, error: formErr } = await supabase
          .from('forms')
          .select('*')
          .eq('id', id)
          .single();
        if (!mounted) return;
        if (!formErr) setForm(formData as FormType);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load submission');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [id, submissionId]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setCopyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prepare submission text for export
  const getSubmissionText = (format: FileFormat) => {
    if (!submission || !form) return '';
    if (format === 'json') return JSON.stringify(submission.data, null, 2);
    if (format === 'csv') {
      const fields = form.schema.fields;
      const header = fields.map(f => `"${f.label.replace(/"/g, '""')}"`).join(',');
      const line = fields.map(f => `"${String(submission.data[f.id] ?? '').replace(/"/g, '""')}"`).join(',');
      return `${header}\n${line}`;
    }
    if (format === 'txt') {
      return form.schema.fields.map(f => `${f.label}: ${submission.data[f.id] ?? '-'}`).join('\n');
    }
    return '';
  };

  // Download submission file
  const downloadFile = (format: FileFormat) => {
    if (!submission || !form) return;

    let blob: Blob;
    let filename = `${form.title || 'submission'}-${submission.id}.${format}`;

    if (format === 'json') blob = new Blob([getSubmissionText('json')], { type: 'application/json' });
    else if (format === 'csv') blob = new Blob([getSubmissionText('csv')], { type: 'text/csv' });
    else if (format === 'txt') blob = new Blob([getSubmissionText('txt')], { type: 'text/plain' });
    else if (format === 'xls') {
      const html = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="UTF-8"></head>
        <body>
        <table border="1">
          <tr>${form.schema.fields.map(f => `<th>${f.label}</th>`).join('')}</tr>
          <tr>${form.schema.fields.map(f => `<td>${submission.data[f.id] ?? ''}</td>`).join('')}</tr>
        </table>
        </body>
        </html>`;
      blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    } else return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setDropdownOpen(false);
  };

  // Copy to clipboard
  const copyToClipboard = (format: FileFormat) => {
    const text = getSubmissionText(format);
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopyDropdownOpen(false);
    setTimeout(() => setCopied(false), 1500);
  };

  // Render Field View
  const renderFieldView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {form?.schema.fields.map(field => (
        <div key={field.id} className="flex flex-col group">
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            {field.label} {field.type && <span className="text-xs text-gray-400">({field.type})</span>}
          </label>
          <div className="bg-gray-100 rounded px-3 py-2 text-gray-800 group-hover:bg-gray-200 transition">
            {submission?.data[field.id] ?? '-'}
          </div>
        </div>
      ))}
    </div>
  );

  // Render Table View
  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {form?.schema.fields.map(field => (
            <tr key={field.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-700">{field.label}</td>
              <td className="px-6 py-4 text-gray-700">{submission?.data[field.id] ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render JSON View using <pre>
  const renderJSONView = () => (
    <pre className="bg-gray-50 rounded p-4 overflow-auto text-sm max-h-[60vh] text-gray-800">
      {JSON.stringify(submission?.data, null, 2)}
    </pre>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to={`/form/${id}/submissions`} className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200 transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{form?.title || 'Form'}</h1>
              <span className="inline-block mt-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                Submission ID {submission?.id ?? '-'}
              </span>
            </div>
          </div>

          {/* Download / Copy */}
          <div className="relative flex gap-2" ref={dropdownRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              <Download /> Download <ChevronDown size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCopyDropdownOpen(!copyDropdownOpen); }}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-200 transition relative"
            >
              <Copy /> {copied ? 'Copied!' : 'Copy'} <ChevronDown size={14} />
            </button>

            {/* Download dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                {(['json','csv','xls','txt'] as FileFormat[]).map(f => (
                  <button key={f} onClick={() => downloadFile(f)} className="w-full text-left px-4 py-2 hover:bg-gray-100">{f.toUpperCase()}</button>
                ))}
              </div>
            )}

            {/* Copy dropdown */}
            {copyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                {(['json','csv','txt'] as FileFormat[]).map(f => (
                  <button key={f} onClick={() => copyToClipboard(f)} className="w-full text-left px-4 py-2 hover:bg-gray-100">{f.toUpperCase()}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Loading/Error */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>
        ) : !submission ? (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded">Submission not found.</div>
        ) : (
          <>
            {/* Info & View Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Submission Info</h2>
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Submitted At</label>
                  <div className="text-gray-700">{new Date(submission.created_at).toLocaleString()}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Submitter</label>
                  <div className="text-gray-700">{submission.user_id || 'Guest'}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-gray-800">View Mode</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('fields')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${viewMode === 'fields' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Grid size={18} /> Fields
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <List size={18} /> Table
                  </button>
                  <button
                    onClick={() => setViewMode('json')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${viewMode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Code size={18} /> JSON
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Data */}
            <div className="bg-white rounded-xl shadow p-6 mt-6">
              {viewMode === 'fields' && renderFieldView()}
              {viewMode === 'table' && renderTableView()}
              {viewMode === 'json' && renderJSONView()}
            </div>

            {/* Insights & Actions */}
            {/* <div className="bg-white rounded-xl shadow p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Insights & Actions</h2>
              <div className="flex flex-col gap-3">
                <p className="text-gray-600">Here you can display charts: submission trends, top fields, or submitter stats.</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
                    <CheckCircle /> Verify Submission
                  </button>
                  <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700">
                    <AlertTriangle /> Flag Submission
                  </button>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}

export default SubmissionDetail;
