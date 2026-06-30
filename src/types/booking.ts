// These are used across services, hooks, and components

export type BookingStatus =
  | "pending_confirmation"
  | "confirmed"
  | "high_risk"
  | "cancelled_due_to_no_confirmation";

export type RiskLevel = "normal" | "medium" | "high";

export interface Booking {
  id: string;
  customer_name: string;
  customer_contact: string;
  service_type?: string | null;
  booking_start: string; // ISO datetime string from Supabase
  booking_end: string;   // ISO datetime string from Supabase
  status: BookingStatus;
  risk_level: RiskLevel;
  confirmation_deadline: string; // ISO datetime string
  note?: string | null;
  created_at: string;
  updated_at: string;
}