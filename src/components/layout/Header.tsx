"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import MobileNav from "./MobileNav";
import TandemBike from "@/components/ui/TandemBike";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="bg-chalk/90 backdrop-blur-sm border-b border-bistro/10 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <TandemBike className="w-10 h-4 transition-colors text-bistro group-hover:text-mountain" />
          <span className="font-heading text-xl text-bistro font-bold">Le Tandem</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  pathname === link.href ? "text-accent" : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 text-bistro" aria-label="Ouvrir le menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
