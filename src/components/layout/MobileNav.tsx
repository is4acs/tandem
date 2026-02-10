"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import TandemBike from "@/components/ui/TandemBike";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-bistro/45" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-72 bg-cream shadow-xl flex flex-col border-l border-bistro/10">
        <div className="flex items-center justify-between p-4 border-b border-bistro/10">
          <div className="pr-2">
            <Image
              src="/images/logo-tandem-transparent.png"
              alt="Le Tandem Bistrot-Resto"
              width={1200}
              height={374}
              className="h-8 w-auto object-contain"
            />
          </div>
          <button onClick={onClose} className="p-2 text-bistro" aria-label="Fermer le menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    pathname === link.href ? "bg-bistro text-chalk" : "text-bistro hover:bg-bistro/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-bistro/10">
          <p className="text-xs text-center text-slate-light mb-2">Le tandem, un vélo deux places</p>
          <TandemBike className="w-24 h-8 mx-auto text-mountain/40" />
        </div>
      </div>
    </div>
  );
}
