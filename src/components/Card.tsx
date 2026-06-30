// A reusable card component used throughout the app.
// Useful for forms, lists, and grouped UI sections.

import type { ReactNode } from "react";

interface CardProps {
  title?: string; // optional title displayed at the top
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4 shadow-sm">
      {/* Optional title */}
      {title && (
        <h2 className="mb-2 text-sm font-semibold text-slate-200">
          {title}
        </h2>
      )}

      {/* Card content */}
      {children}
    </div>
  );
}