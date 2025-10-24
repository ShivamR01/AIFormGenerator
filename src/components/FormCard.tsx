import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Trash2, Calendar, FileText, Copy } from 'lucide-react';
import type { Form } from '../lib/supabase';

interface FormCardProps {
  form: Form;
  submissionCount: number;
  onDelete: (id: string) => void;
}

export function FormCard({ form, submissionCount, onDelete }: FormCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const formUrl = `${window.location.origin}/form/${form.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = () => {
    onDelete(form.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between h-full">

      {/* ===== Form Header ===== */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{form.title}</h3>
        {form.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{form.description}</p>
        )}
      </div>

      {/* ===== Form Details ===== */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-4">
        <div className="flex items-center">
          <FileText size={16} className="mr-1" />
          <span>{form.schema.fields.length} fields</span>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          <span>{new Date(form.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* ===== Submissions Info ===== */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4 text-center">
        <div className="text-sm text-gray-600 mb-1">Submissions</div>
        <div className="text-3xl font-bold text-blue-600">{submissionCount}</div>
      </div>

      {/* ===== Action Buttons ===== */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-auto">
        <Link
          to={`/form/${form.id}`}
          className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ExternalLink size={18} className="mr-2" />
          View Form
        </Link>

        <Link
          to={`/form/${form.id}/submissions`}
          className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <FileText size={16} className="mr-2" />
          Submissions
        </Link>

        <button
          onClick={handleCopyLink}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-colors font-medium
            ${copied ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Copy size={16} className="mr-1" />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex-1 flex items-center justify-center bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors font-medium"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* ===== Delete Confirmation Modal ===== */}
      {showDeleteConfirm && (
        <DeleteConfirmationModal
          onDelete={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

interface DeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

function DeleteConfirmationModal({ onDelete, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg animate-fadeIn">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Form?</h3>
        <p className="text-gray-600 mb-6">
          This will permanently delete the form and all its submissions. This action cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
