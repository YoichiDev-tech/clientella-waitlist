// Displays all bookings in a list
// Fetches bookings from Supabase and renders BookingRow for each

import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import type { Booking } from "../types/booking";
import { BookingRow } from "./BookingRow";
import { Card } from "./Card";
import { runRiskEngine } from "../services/riskEngine";

export function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const data = await getBookings();

    // run riskEngine before displaying
    await runRiskEngine(data);

    // fetch again to get updated values
    const updated = await getBookings();

    setBookings(updated);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Card title="Bookings">
      {loading && (
        <p className="text-xs text-slate-400">Loading...</p>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-xs text-slate-400">No bookings yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {!loading &&
          bookings.map((b) => (
            <BookingRow key={b.id} booking={b} refresh={load} />
          ))}
      </div>
    </Card>
  );
}