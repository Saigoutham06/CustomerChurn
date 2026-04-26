import { BarChart3, Target, TrendingDown } from 'lucide-react';
import type { Metrics } from '../api';

interface MetricsGridProps {
  metrics: Metrics;
}

interface MetricDefinition {
  key: keyof Metrics;
  label: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

const METRIC_DEFINITIONS: MetricDefinition[] = [
  {
    key: 'rmse',
    label: 'RMSE',
    icon: <TrendingDown className="w-6 h-6" />,
    color: 'text-cyan-400',
    borderColor: 'border-l-cyan-400',
  },
  {
    key: 'accuracy',
    label: 'Accuracy',
    icon: <Target className="w-6 h-6" />,
    color: 'text-emerald-400',
    borderColor: 'border-l-emerald-400',
  },
  {
    key: 'aic',
    label: 'AIC',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'text-amber-400',
    borderColor: 'border-l-amber-400',
  },
];

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const visibleMetrics = METRIC_DEFINITIONS.filter(
    (metric) => metrics[metric.key] !== null && metrics[metric.key] !== undefined
  );

  if (visibleMetrics.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid gap-6 mb-8 ${
        visibleMetrics.length === 1
          ? 'grid-cols-1'
          : visibleMetrics.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {visibleMetrics.map((metric) => (
        <div
          key={metric.key}
          className={`metric-card ${metric.borderColor} group`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`icon-wrapper bg-white/5 ${metric.color}`}>
              {metric.icon}
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium mb-1">{metric.label}</p>
          <p className={`text-3xl font-bold ${metric.color}`}>
            {(metrics[metric.key] as number).toFixed(4)}
          </p>
        </div>
      ))}
    </div>
  );
}
