// Hook that manages booking form state and submission
// This is the logic behind the booking form UI

import { useState } from "react";
import { createBooking } from "../services/bookingService";

export function useBookingForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");
  const [note, setNote] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submit() {
    setSubmitting(true);
    setErrorMessage(null);

    // Basic validation
    if (!customerName || !customerContact || !bookingStart || !bookingEnd) {
      setErrorMessage("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    const ok = await createBooking({
      customer_name: customerName,
      customer_contact: customerContact,
      service_type: serviceType || undefined,
      booking_start: bookingStart,
      booking_end: bookingEnd,
      note: note || undefined
    });

    setSubmitting(false);

    if (!ok) {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    // Reset form
    setCustomerName("");
    setCustomerContact("");
    setServiceType("");
    setBookingStart("");
    setBookingEnd("");
    setNote("");

    setSuccess(true);
  }

  return {
    customerName,
    setCustomerName,
    customerContact,
    setCustomerContact,
    serviceType,
    setServiceType,
    bookingStart,
    setBookingStart,
    bookingEnd,
    setBookingEnd,
    note,
    setNote,
    submitting,
    success,
    errorMessage,
    submit
  };
}