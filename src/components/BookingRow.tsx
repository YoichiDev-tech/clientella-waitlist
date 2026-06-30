// A single booking row inside the booking list
// Shows customer info, time, status, risk, and action buttons

import type { Booking } from "../types/booking";
import { StatusBadge } from "./StatusBadge";
import { RiskIndicator } from "./RiskIndicator";
import {
  updateBookingStatus,
  updateRiskLevel
} from "../services/bookingService";

interface BookingRowProps {
  booking: Booking;
  refresh: () => void; // callback to reload bookings
}

export function BookingRow({ booking, refresh }: BookingRowProps) {
  async function confirmBooking() {
    await updateBookingStatus(booking.id, "confirmed");
    refresh();
  }

  async function cancelBooking() {
    await updateBookingStatus(booking.id, "cancelled_due_to_no_confirmation");
    refresh();
  }

  async function markHighRisk() {
    await updateRiskLevel(booking.id, "high");
    refresh();
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-slate-800 bg-slate-900/60 p-3 text-xs">
      {/* Top row: customer + time */}
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-slate-200">{booking.customer_name}</p>
          <p className="text-slate-400">{booking.customer_contact}</p>
        </div>

        <div className="text-right text-slate-300">
          <p>{new Date(booking.booking_start).toLocaleString()}</p>
          <p className="text-slate-500">
            Ends {new Date(booking.booking_end).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Middle row: status + risk */}
      <div className="flex items-center gap-3">
        <StatusBadge status={booking.status} />
        <RiskIndicator risk={booking.risk_level} />
      </div>

      {/* Bottom row: actions */}
      <div className="flex gap-2 pt-2">
        {booking.status === "pending_confirmation" && (
          <>
            <button
              onClick={confirmBooking}
              className="rounded-md bg-emerald-500 px-2 py-1 text-slate-950 hover:bg-emerald-400"
            >
              Confirm
            </button>

            <button
              onClick={cancelBooking}
              className="rounded-md bg-red-500 px-2 py-1 text-slate-950 hover:bg-red-400"
            >
              Cancel
            </button>
          </>
        )}

        {booking.risk_level !== "high" && (
          <button
            onClick={markHighRisk}
            className="rounded-md bg-yellow-500 px-2 py-1 text-slate-950 hover:bg-yellow-400"
          >
            Mark high risk
          </button>
        )}
      </div>
    </div>
  );
}