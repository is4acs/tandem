"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import TandemBike from "@/components/ui/TandemBike";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

function DashboardIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 13h6V4H4zM14 20h6v-9h-6zM14 10h6V4h-6zM4 20h6v-5H4z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" strokeLinecap="round" />
    </svg>
  );
}

function GuestbookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h6" strokeLinecap="round" />
    </svg>
  );
}

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: <DashboardIcon /> },
  { href: "/admin/carte", label: "Carte", icon: <MenuIcon /> },
  { href: "/admin/evenements", label: "Evenements", icon: <CalendarIcon /> },
  { href: "/admin/livre-dor", label: "Livre d'Or", icon: <GuestbookIcon /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,rgba(107,163,196,0.18),transparent_45%),linear-gradient(180deg,#f5f2eb_0%,#f1eee8_100%)]">
      <header className="sticky top-0 z-40 border-b border-bistro/10 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="inline-flex items-center gap-2 font-heading text-xl text-bistro hover:text-bistro-dark">
              <TandemBike className="h-6 w-14 text-mountain-dark" />
              <span>Le Tandem</span>
            </Link>
            <span className="rounded-full border border-mountain/30 bg-mountain/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-mountain-dark">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-bistro/15 bg-chalk px-3 py-1.5 text-sm font-medium text-bistro hover:bg-bistro/5"
            >
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate hover:bg-bistro/5 hover:text-bistro"
            >
              Deconnexion
            </button>
          </div>
        </div>

        <div className="border-t border-bistro/10">
          <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
            {ADMIN_NAV.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-bistro text-chalk shadow-sm"
                      : "border border-bistro/15 bg-chalk/80 text-bistro hover:bg-bistro/5"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
