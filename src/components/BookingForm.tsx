// UI form for creating new bookings
// Uses the useBookingForm hook to manage state and submission

import { Card } from "./Card";
import { useBookingForm } from "../hooks/useBookingForm";

export function BookingForm() {
  const {
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
  } = useBookingForm();

  return (
    <Card title="Create a new booking">
      <form
        className="flex flex-col gap-3 text-xs"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {/* Customer name */}
        <div>
          <label className="mb-1 block text-slate-300">Customer name</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        {/* Customer contact */}
        <div>
          <label className="mb-1 block text-slate-300">Customer contact</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            placeholder="Phone, email, or WhatsApp"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            required
          />
        </div>

        {/* Service type */}
        <div>
          <label className="mb-1 block text-slate-300">Service type (optional)</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            placeholder="Haircut, massage, consultation..."
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          />
        </div>

        {/* Booking start */}
        <div>
          <label className="mb-1 block text-slate-300">Start time</label>
          <input
            type="datetime-local"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={bookingStart}
            onChange={(e) => setBookingStart(e.target.value)}
            required
          />
        </div>

        {/* Booking end */}
        <div>
          <label className="mb-1 block text-slate-300">End time</label>
          <input
            type="datetime-local"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={bookingEnd}
            onChange={(e) => setBookingEnd(e.target.value)}
            required
          />
        </div>

        {/* Note */}
        <div>
          <label className="mb-1 block text-slate-300">Note (optional)</label>
          <textarea
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-[11px] text-red-300">{errorMessage}</p>
        )}

        {/* Success message */}
        {success && (
          <p className="text-[11px] text-emerald-300">
            Booking created successfully.
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-fit items-center rounded-md bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create booking"}
        </button>
      </form>
    </Card>
  );
}