// Visual badge for booking status
// Helps the business owner quickly understand the state of each booking

import type { BookingStatus } from "../types/booking";

interface StatusBadgeProps {
  status: BookingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<BookingStatus, { label: string; color: string }> = {
    pending_confirmation: {
      label: "Pending confirmation",
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
    },
    confirmed: {
      label: "Confirmed",
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    },
    high_risk: {
      label: "High risk",
      color: "bg-red-500/20 text-red-300 border-red-500/40"
    },
    cancelled_due_to_no_confirmation: {
      label: "Cancelled (no confirmation)",
      color: "bg-slate-500/20 text-slate-300 border-slate-500/40"
    }
  };

  const { label, color } = map[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}