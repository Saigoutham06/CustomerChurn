import { Cpu, TrendingUp, Brain } from 'lucide-react';

interface ResultsHeaderProps {
  modelUsed: string;
  problemType: string;
  onReset: () => void;
}

export function ResultsHeader({ modelUsed, problemType, onReset }: ResultsHeaderProps) {
  const getIconForProblemType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'time_series':
        return TrendingUp;
      case 'classification':
        return Cpu;
      case 'regression':
        return Brain;
      default:
        return Cpu;
    }
  };

  const IconComponent = getIconForProblemType(problemType);

  const formatProblemType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="badge-primary">
          <Cpu className="w-4 h-4" />
          {modelUsed}
        </div>
        <div className="badge-secondary">
          <IconComponent className="w-4 h-4" />
          {formatProblemType(problemType)}
        </div>
      </div>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-slate-100 text-sm font-medium transition-all duration-200"
      >
        Upload Another File
      </button>
    </div>
  );
}
