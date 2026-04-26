import { AlertTriangle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
  onRetry?: () => void;
}

export function ErrorAlert({ message, onDismiss, onRetry }: ErrorAlertProps) {
  return (
    <div className="glass-sm p-4 rounded-xl border-l-4 border-red-400 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-red-300 font-medium">Error</p>
          <p className="text-sm text-slate-300 mt-1">{message}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            Retry
          </button>
        )}
        <button
          onClick={onDismiss}
          className="p-1.5 text-slate-400 hover:text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
