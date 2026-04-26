import { Upload } from 'lucide-react';
import { FileUploader } from './FileUploader';

interface EmptyStateProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function EmptyState({ onFileSelect, isLoading }: EmptyStateProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex icon-wrapper mb-6 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 w-16 h-16">
            <Upload className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            ML Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Upload a file to begin your machine learning analysis
          </p>
        </div>

        <FileUploader onFileSelect={onFileSelect} isLoading={isLoading} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-sm p-6 rounded-xl">
            <div className="text-2xl font-semibold text-cyan-400 mb-2">Dynamic</div>
            <p className="text-sm text-slate-400">Schema-agnostic UI renders based on your data</p>
          </div>
          <div className="glass-sm p-6 rounded-xl">
            <div className="text-2xl font-semibold text-emerald-400 mb-2">Fast</div>
            <p className="text-sm text-slate-400">Instant predictions and comprehensive analysis</p>
          </div>
          <div className="glass-sm p-6 rounded-xl">
            <div className="text-2xl font-semibold text-amber-400 mb-2">Secure</div>
            <p className="text-sm text-slate-400">Your data is processed securely on the backend</p>
          </div>
        </div>
      </div>
    </div>
  );
}
