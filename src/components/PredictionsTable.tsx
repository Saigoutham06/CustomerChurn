import { useEffect, useState } from 'react';

interface PredictionsTableProps {
  predictions: (string | number)[] | Record<string, unknown>[];
}

type PredictionType = 'regression' | 'classification' | 'object';

const COLOR_PALETTE = [
  'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
  'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  'bg-amber-500/20 text-amber-300 border-amber-400/30',
  'bg-rose-500/20 text-rose-300 border-rose-400/30',
  'bg-violet-500/20 text-violet-300 border-violet-400/30',
  'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
];

export function PredictionsTable({ predictions }: PredictionsTableProps) {
  const [predictionType, setPredictionType] = useState<PredictionType>('regression');
  const [uniqueLabels, setUniqueLabels] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (!predictions || predictions.length === 0) return;

    const first = predictions[0];

    if (typeof first === 'object' && !Array.isArray(first)) {
      setPredictionType('object');
      return;
    }

    if (typeof first === 'number') {
      setPredictionType('regression');
    } else if (typeof first === 'string') {
      setPredictionType('classification');
      const labels = new Map<string, number>();
      predictions.forEach((pred) => {
        const label = String(pred);
        labels.set(label, (labels.get(label) || 0) + 1);
      });
      setUniqueLabels(labels);
    }
  }, [predictions]);

  if (!predictions || predictions.length === 0) {
    return (
      <div className="glass p-6 rounded-2xl">
        <p className="text-sm text-slate-400">No predictions available</p>
      </div>
    );
  }

  if (predictionType === 'object') {
    const first = predictions[0] as Record<string, unknown>;
    const keys = Object.keys(first);

    return (
      <div className="glass rounded-2xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Index
                </th>
                {keys.map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
                  {keys.map((key) => (
                    <td key={key} className="px-6 py-4 text-sm text-slate-200">
                      {typeof (pred as Record<string, unknown>)[key] === 'number'
                        ? ((pred as Record<string, unknown>)[key] as number).toFixed(4)
                        : String((pred as Record<string, unknown>)[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (predictionType === 'classification') {
    return (
      <div className="glass p-6 rounded-2xl mb-8">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Predictions</h3>
        <div className="flex flex-wrap gap-3">
          {predictions.map((pred, index) => {
            const label = String(pred);
            const colorIndex = Array.from(uniqueLabels.keys()).indexOf(label) % COLOR_PALETTE.length;
            const color = COLOR_PALETTE[colorIndex];

            return (
              <div
                key={index}
                className={`badge border ${color}`}
              >
                {label}
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-400 font-medium mb-3">Label Distribution</p>
          <div className="flex flex-wrap gap-3">
            {Array.from(uniqueLabels.entries()).map(([label, count], idx) => {
              const colorIndex = idx % COLOR_PALETTE.length;
              const color = COLOR_PALETTE[colorIndex];

              return (
                <div key={label} className={`badge border ${color} text-xs`}>
                  {label}: {count}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-2xl mb-8">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Predictions</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Index
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Prediction
              </th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((pred, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-cyan-300 font-medium">
                  {(pred as number).toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
