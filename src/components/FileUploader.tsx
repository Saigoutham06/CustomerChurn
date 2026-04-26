import { useState } from 'react';
import { Cloud, AlertCircle } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['.csv', '.xlsx', '.xls'];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function FileUploader({ onFileSelect, isLoading }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setError(`Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size: 50MB');
      return false;
    }

    setError('');
    return true;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
          disabled={isLoading}
        />

        <label htmlFor="file-input" className="flex flex-col items-center gap-4 cursor-pointer">
          <div className="icon-wrapper bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30">
            <Cloud className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-100 mb-1">
              Drag and drop your file
            </h3>
            <p className="text-sm text-slate-400">
              or click to browse • CSV, XLSX, XLS • Max 50MB
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-4 glass-sm p-4 rounded-xl border-l-4 border-red-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
