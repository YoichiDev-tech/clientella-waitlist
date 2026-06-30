// Risk engine for detecting risky bookings and auto-cancelling no-shows
// This runs manually (on dashboard refresh) for MVP

import type { Booking, RiskLevel } from "../types/booking";
import {
  updateBookingStatus,
  updateRiskLevel
} from "./bookingService";

// Calculate risk level based on time until confirmation deadline
function calculateRisk(booking: Booking): RiskLevel {
  const now = new Date();
  const deadline = new Date(booking.confirmation_deadline);

  const diffMinutes = (deadline.getTime() - now.getTime()) / 1000 / 60;

  if (diffMinutes <= 0) {
    return "high"; // deadline passed
  }

  if (diffMinutes <= 60) {
    return "medium"; // less than 1 hour left
  }

  return "normal";
}

// Process a single booking
async function processBooking(booking: Booking) {
  const risk = calculateRisk(booking);

  // Update risk level if changed
  if (risk !== booking.risk_level) {
    await updateRiskLevel(booking.id, risk);
  }

  // Auto-cancel if deadline passed and still pending
  if (
    risk === "high" &&
    booking.status === "pending_confirmation"
  ) {
    await updateBookingStatus(
      booking.id,
      "cancelled_due_to_no_confirmation"
    );
  }
}

// Process all bookings
export async function runRiskEngine(bookings: Booking[]) {
  for (const booking of bookings) {
    await processBooking(booking);
  }
}