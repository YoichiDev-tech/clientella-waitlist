// Calculates recovered time from auto-cancelled bookings.
// Recovered time = duration of cancelled bookings.

import type { Booking } from "../types/booking";

export interface RecoveryStats {
  recoveredMinutes: number;
  recoveredHours: number;
  cancelledCount: number;
}

export function calculateRecovery(bookings: Booking[]): RecoveryStats {
  let recoveredMinutes = 0;
  let cancelledCount = 0;

  for (const booking of bookings) {
    if (booking.status === "cancelled_due_to_no_confirmation") {
      cancelledCount++;

      const start = new Date(booking.booking_start);
      const end = new Date(booking.booking_end);

      const diffMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
      recoveredMinutes += diffMinutes;
    }
  }

  return {
    recoveredMinutes,
    recoveredHours: recoveredMinutes / 60,
    cancelledCount
  };
}