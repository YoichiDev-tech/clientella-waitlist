// UI form for joining the waitlist.
// Uses the useWaitlist hook to manage state and submission.

import { useWaitlist } from "../hooks/useWaitlist";
import { Card } from "./Card";

export function WaitlistForm() {
  const {
    email,
    setEmail,
    businessType,
    setBusinessType,
    businessName,
    setBusinessName,
    submitting,
    success,
    errorMessage,
    submit
  } = useWaitlist();

  if (success) {
    return (
      <Card title="You're on the list!">
        <p className="text-xs text-emerald-200">
          You'll get free access on launch day. We'll email you with details.
        </p>
      </Card>
    );
  }

  return (
    <Card title="Join the waitlist">
      <form
        className="flex flex-col gap-3 text-xs"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div>
          <label className="mb-1 block text-slate-300">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-slate-300">Business type (optional)</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            placeholder="Barber shop, salon, coach..."
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-slate-300">Business name (optional)</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-[11px] text-red-300">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-fit items-center rounded-md bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-60"
        >
          {submitting ? "Joining..." : "Join waitlist (free on launch)"}
        </button>
      </form>
    </Card>
  );
}