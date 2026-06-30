import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ showDashboardLink }: { showDashboardLink?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 px-4 py-3">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-sm font-semibold text-sky-400">
          Clientella
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <Link to="/" className="text-slate-300 hover:text-sky-400">Home</Link>
          <Link to="/dashboard" className="text-slate-300 hover:text-sky-400">Dashboard</Link>
          <Link to="/waitlist" className="text-slate-300 hover:text-sky-400">Waitlist</Link>

          {showDashboardLink && (
            <Link
              to="/dashboard"
              className="rounded-md border border-slate-700 px-3 py-1 text-slate-200 hover:border-sky-500 hover:text-sky-300"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="block h-0.5 w-5 bg-slate-300"></span>
          <span className="block h-0.5 w-5 bg-slate-300"></span>
          <span className="block h-0.5 w-5 bg-slate-300"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden mt-3 flex flex-col gap-3 text-sm">
          <Link to="/" className="text-slate-300" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/dashboard" className="text-slate-300" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/waitlist" className="text-slate-300" onClick={() => setOpen(false)}>Waitlist</Link>

          {showDashboardLink && (
            <Link
              to="/dashboard"
              className="rounded-md border border-slate-700 px-3 py-1 text-slate-200"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}