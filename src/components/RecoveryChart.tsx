// Tiny MVP chart showing recovered hours visually
// Pure SVG. No libraries

interface RecoveryChartProps {
  recoveredHours: number;
}

export function RecoveryChart({ recoveredHours }: RecoveryChartProps) {
  const maxHours = Math.max(recoveredHours, 1); // avoid zero-width bar
  const width = Math.min((recoveredHours / maxHours) * 100, 100);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">
        Recovered Hours (visual)
      </h3>

      <svg width="100%" height="12">
        <rect
          x="0"
          y="0"
          width={`${width}%`}
          height="12"
          className="fill-emerald-400"
        />
      </svg>

      <p className="mt-2 text-xs text-slate-300">
        {recoveredHours.toFixed(2)} hours recovered
      </p>
    </div>
  );
}