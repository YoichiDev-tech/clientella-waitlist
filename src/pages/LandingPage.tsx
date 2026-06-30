// Public landing page explaining the problem and showing the waitlist form.

import { Layout } from "../components/Layout";
import { WaitlistForm } from "../components/WaitlistForm";

export function LandingPage() {
  return (
    <Layout>
      <section className="grid gap-8 md:grid-cols-2">

        {/* Left side text */}
        <div className="flex flex-col gap-4 text-center md:text-left px-2">
          <h1 className="text-2xl font-bold text-slate-50 leading-snug">
            Stop losing money to no-shows.
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            No-shows hurt small businesses: empty chairs, wasted time, and lost revenue.
            This system helps you spot risky bookings early and automatically cancel
            unconfirmed appointments — so you can reinvest that time into walk-ins,
            loyal clients, or your own rest.
          </p>

          <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
            <li>Track booking confirmation status</li>
            <li>Auto-cancel unconfirmed bookings</li>
            <li>See recovered time slots</li>
          </ul>

          <p className="text-xs text-sky-300 font-medium">
            Join the waitlist today to get the full app for <strong>free</strong> on launch day.
          </p>
        </div>

        {/* Right side form */}
        <div className="flex flex-col gap-4 px-2">
          <WaitlistForm />
        </div>

      </section>
    </Layout>
  );
}