// Dashboard page showing booking form + booking list
// This is the main interface for business owners

import { Layout } from "../components/Layout";
import { BookingForm } from "../components/BookingForm";
import { BookingList } from "../components/BookingList";
import { RiskChart } from "../components/RiskChart";
import { RecoveryChart } from "../components/recoveryChart";
import { StatusChart } from "../components/StatusChart";

import { calculateRecovery } from "../services/recoveryEngine";
import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";

export function DashboardPage() {
  const [recovery, setRecovery] = useState({
    recoveredMinutes: 0,
    recoveredHours: 0,
    cancelledCount: 0
  });

  const [bookings, setBookings] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    setLoading(true);

    const data = await getBookings();
    setBookings(data);

    const stats = calculateRecovery(data);
    setRecovery(stats);

    setLoading(false);
  }

  useEffect(() => {
    loadStats();
  }, []);

  async function refreshAll() {
    await loadStats();
  }

  // Tiny loading indicator
  if (loading) {
    return (
      <Layout showDashboardLink={false}>
        <div className="text-center text-slate-300 py-10 text-sm">
          Loading dashboard…
        </div>
      </Layout>
    );
  }

  return (
    <Layout showDashboardLink={false}>
      
      {/* Recovery stats card */}
      <section className="mb-6">
        <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4 shadow-sm">

          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Recovered Time
            </h2>

            <button
              onClick={refreshAll}
              className="rounded-md bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-sky-400"
            >
              Refresh
            </button>
          </div>

          {/* Charts */}
          <div className="flex flex-col gap-4">
            <RecoveryChart recoveredHours={recovery.recoveredHours} />
            <StatusChart bookings={bookings} />
            <RiskChart bookings={bookings} />
          </div>

          {/* Stats */}
          <div className="mt-4 space-y-1">
            <p className="text-xs text-slate-300">
              Cancelled bookings: {recovery.cancelledCount}
            </p>
            <p className="text-xs text-slate-300">
              Recovered minutes: {Math.round(recovery.recoveredMinutes)}
            </p>
            <p className="text-xs text-slate-300">
              Recovered hours: {recovery.recoveredHours.toFixed(2)}
            </p>
          </div>
        </div>
      </section>

      {/* Booking form + list */}
      <section className="grid gap-6 md:grid-cols-2">

        {/* Form */}
        <div className="flex flex-col gap-4">
          <BookingForm />
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          <BookingList />
        </div>

      </section>
    </Layout>
  );
}