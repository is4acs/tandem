"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ADMIN_NAV = [
  { href: "/admin", label: "Tableau de bord", icon: "\u{1F3E0}" },
  { href: "/admin/carte", label: "La Carte", icon: "\u{1F37D}\u{FE0F}" },
  { href: "/admin/evenements", label: "\u{00C9}v\u{00E9}nements", icon: "\u{1F389}" },
  { href: "/admin/livre-dor", label: "Livre d'Or", icon: "\u{1F4D6}" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      <header className="bg-wood text-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-heading text-lg text-gold font-bold">Le Tandem</Link>
            <span className="text-xs bg-terracotta/80 text-white px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-cream/60 hover:text-cream transition-colors">Voir le site</Link>
            <button onClick={handleLogout} className="text-sm text-cream/60 hover:text-red-300 transition-colors">D&eacute;connexion</button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <nav className="mb-6 flex flex-wrap gap-2">
          {ADMIN_NAV.map((link) => (
            <Link key={link.href} href={link.href} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href ? "bg-terracotta text-white" : "bg-white text-wood hover:bg-gold/10 border border-gold/20"}`}>
              <span>{link.icon}</span>{link.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
