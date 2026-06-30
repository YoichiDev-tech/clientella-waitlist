// Tiny MVP chart showing confirmed vs cancelled bookings

import type { Booking } from "../types/booking";

interface StatusChartProps {
  bookings: Booking[];
}

export function StatusChart({ bookings }: StatusChartProps) {
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const cancelled = bookings.filter(b => b.status === "cancelled_due_to_no_confirmation").length;

  const total = confirmed + cancelled || 1;

  const confirmedWidth = (confirmed / total) * 100;
  const cancelledWidth = (cancelled / total) * 100;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">
        Booking Status Overview
      </h3>

      <svg width="100%" height="12">
        <rect
          x="0"
          y="0"
          width={`${confirmedWidth}%`}
          height="12"
          className="fill-sky-400"
        />
        <rect
          x={`${confirmedWidth}%`}
          y="0"
          width={`${cancelledWidth}%`}
          height="12"
          className="fill-red-400"
        />
      </svg>

      <p className="mt-2 text-xs text-slate-300">
        Confirmed: {confirmed} — Cancelled: {cancelled}
      </p>
    </div>
  );
}