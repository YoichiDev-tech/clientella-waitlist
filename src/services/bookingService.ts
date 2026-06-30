// Supabase service for all booking operations
// This file is the backbone of the booking system

import { supabase } from "../lib/supabaseClient";
import type { Booking, BookingStatus, RiskLevel } from "../types/booking";

export interface CreateBookingInput {
  customer_name: string;
  customer_contact: string;
  service_type?: string;
  booking_start: string; // ISO datetime
  booking_end: string;   // ISO datetime
  note?: string;
}

// Create a new booking
export async function createBooking(input: CreateBookingInput): Promise<boolean> {
  const { error } = await supabase.from("bookings").insert({
    customer_name: input.customer_name,
    customer_contact: input.customer_contact,
    service_type: input.service_type ?? null,
    booking_start: input.booking_start,
    booking_end: input.booking_end,
    status: "pending_confirmation",
    risk_level: "normal",
    confirmation_deadline: calculateConfirmationDeadline(input.booking_start),
    note: input.note ?? null
  });

  if (error) {
    console.error("Error creating booking:", error);
    return false;
  }

  return true;
}

// Fetch all bookings (sorted by start time)
export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("booking_start", { ascending: true });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data as Booking[];
}

// Update booking status
export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<boolean> {
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating booking status:", error);
    return false;
  }

  return true;
}

// Update risk level
export async function updateRiskLevel(
  id: string,
  risk: RiskLevel
): Promise<boolean> {
  const { error } = await supabase
    .from("bookings")
    .update({ risk_level: risk })
    .eq("id", id);

  if (error) {
    console.error("Error updating risk level:", error);
    return false;
  }

  return true;
}

// Helper: calculate confirmation deadline (2 hours before appointment)
function calculateConfirmationDeadline(bookingStartISO: string): string {
  const date = new Date(bookingStartISO);
  date.setHours(date.getHours() - 2);
  return date.toISOString();
}