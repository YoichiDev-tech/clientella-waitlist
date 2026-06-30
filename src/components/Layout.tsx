// A simple layout wrapper used for all pages.
// It provides consistent spacing, a centered content area,
// and allows to optionally show a top navigation bar.

import type { ReactNode } from "react";
import Navbar from "./Navbar"; // correct import

interface LayoutProps {
  children: ReactNode;
  showDashboardLink?: boolean;
}

export function Layout({ children, showDashboardLink }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar showDashboardLink={showDashboardLink} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        {children}
      </main>

      <footer className="mt-10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Clientella — All rights reserved.
      </footer>
    </div>
  );
}