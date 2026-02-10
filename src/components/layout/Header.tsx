"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-bistro/10 bg-cream backdrop-blur-none md:bg-cream/90 md:backdrop-blur-md">
      <div className="h-1 bg-gradient-to-r from-mountain-dark via-mountain to-mountain-light" />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 md:h-[4.5rem] flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center">
          <Image
            src="/images/logo-tandem-transparent.png"
            alt="Le Tandem Bistrot-Resto"
            width={1200}
            height={374}
            className="h-9 sm:h-10 md:h-11 w-auto object-contain"
            priority
          />
          <span className="sr-only">Le Tandem Bistrot-Resto</span>
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active
                      ? "bg-bistro text-chalk shadow-sm"
                      : "text-slate hover:text-bistro hover:bg-bistro/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden h-11 w-11 inline-flex items-center justify-center rounded-xl border border-bistro/20 bg-chalk text-bistro shadow-sm active:scale-[0.98]"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
