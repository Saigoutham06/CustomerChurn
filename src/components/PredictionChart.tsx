import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop,
} from 'recharts';
import type { PlotData } from '../api';

interface PredictionChartProps {
  plotData: PlotData;
}

export function PredictionChart({ plotData }: PredictionChartProps) {
  if (!plotData || !plotData.x || !plotData.y || plotData.x.length === 0) {
    return null;
  }

  if (plotData.x.length !== plotData.y.length) {
    return (
      <div className="glass p-6 rounded-2xl mb-8">
        <p className="text-sm text-amber-300">
          Warning: X and Y data arrays have different lengths. Chart cannot be rendered.
        </p>
      </div>
    );
  }

  const data = plotData.x.map((x, index) => ({
    x: String(x),
    y: Number(plotData.y[index]),
  }));

  const minY = Math.min(...data.map((d) => d.y));
  const maxY = Math.max(...data.map((d) => d.y));

  return (
    <div className="glass p-6 rounded-2xl mb-8 w-full">
      <h3 className="text-lg font-semibold text-slate-100 mb-6">Prediction Results</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="x"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#cbd5e1' }}
          />
          <YAxis
            stroke="#94a3b8"
            domain={[minY * 0.95, maxY * 1.05]}
            style={{ fontSize: '12px' }}
            tick={{ fill: '#cbd5e1' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value) => [(value as number).toFixed(4), 'Value']}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ fill: '#22d3ee', r: 4 }}
            activeDot={{ r: 6 }}
            fill="url(#colorGradient)"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
