// Tiny MVP chart showing risk distribution

import type { Booking } from "../types/booking";

interface RiskChartProps {
  bookings: Booking[];
}

export function RiskChart({ bookings }: RiskChartProps) {
  const normal = bookings.filter(b => b.risk_level === "normal").length;
  const medium = bookings.filter(b => b.risk_level === "medium").length;
  const high = bookings.filter(b => b.risk_level === "high").length;

  const total = normal + medium + high || 1;

  const normalWidth = (normal / total) * 100;
  const mediumWidth = (medium / total) * 100;
  const highWidth = (high / total) * 100;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">
        Risk Levels Overview
      </h3>

      <svg width="100%" height="12">
        <rect
          x="0"
          y="0"
          width={`${normalWidth}%`}
          height="12"
          className="fill-slate-400"
        />
        <rect
          x={`${normalWidth}%`}
          y="0"
          width={`${mediumWidth}%`}
          height="12"
          className="fill-yellow-400"
        />
        <rect
          x={`${normalWidth + mediumWidth}%`}
          y="0"
          width={`${highWidth}%`}
          height="12"
          className="fill-red-400"
        />
      </svg>

      <p className="mt-2 text-xs text-slate-300">
        Normal: {normal} — Medium: {medium} — High: {high}
      </p>
    </div>
  );
}