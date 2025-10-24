import { useState, useCallback } from 'react';
import { Upload, X, File as FileIcon, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
}

export function FileUpload({ onUpload, currentUrl }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [fileType, setFileType] = useState<'image' | 'other' | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleFileChange = useCallback(async (file?: File) => {
    if (!file) return;

    setError(null);
    setUploading(true);
    setFileName(file.name);

    try {
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      const isDocx = file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      if (!isImage && !isPdf && !isDocx) {
        setError('Unsupported file type. Only images, PDF, DOCX are allowed.');
        setUploading(false);
        return;
      }

      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        setError('File size must be less than 20MB');
        setUploading(false);
        return;
      }

      setFileType(isImage ? 'image' : 'other');

      if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
        if (isImage) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreview(base64String);
            onUpload(base64String);
            setUploading(false);
          };
          reader.readAsDataURL(file);
        } else {
          // For other files without Cloudinary, we can't preview; just show filename
          setPreview('');
          onUpload(file.name);
          setUploading(false);
        }
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryUploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/auto/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setPreview(isImage ? data.secure_url : '');
      onUpload(data.secure_url || file.name);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [cloudinaryCloudName, cloudinaryUploadPreset, onUpload]);

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    setFileType(null);
    onUpload('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="space-y-2">
      {preview || fileType === 'other' ? (
        <div className="relative inline-block w-full max-w-xs">
          {fileType === 'image' ? (
            <img
              src={preview!}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-48 border-2 border-gray-200 rounded-lg bg-gray-50">
              <FileIcon className="w-10 h-10 text-gray-400 mr-2" />
              <span className="text-gray-700 truncate max-w-xs">{fileName}</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove uploaded file"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
          `}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            ) : (
              <>
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-500">Images, PDF, DOCX up to 20MB</p>
                {!cloudinaryCloudName && (
                  <p className="text-xs text-amber-600 mt-2">
                    Preview only for images - Configure Cloudinary for permanent storage
                  </p>
                )}
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleInputChange}
            disabled={uploading}
          />
        </label>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
