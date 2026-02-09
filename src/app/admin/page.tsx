"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats { menuItems: number; events: number; pendingMessages: number; }

const QUICK_LINKS = [
  { href: "/admin/carte", label: "G\u00e9rer la Carte", description: "Ajouter, modifier ou supprimer des plats et boissons", icon: "\u{1F37D}\u{FE0F}", color: "bg-terracotta/10 border-terracotta/20 hover:bg-terracotta/20" },
  { href: "/admin/evenements", label: "G\u00e9rer les \u00c9v\u00e9nements", description: "Planifier et g\u00e9rer les soir\u00e9es", icon: "\u{1F389}", color: "bg-gold/10 border-gold/20 hover:bg-gold/20" },
  { href: "/admin/livre-dor", label: "Mod\u00e9rer le Livre d'Or", description: "Approuver ou supprimer les messages", icon: "\u{1F4D6}", color: "bg-green-50 border-green-200 hover:bg-green-100" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [menuRes, eventsRes] = await Promise.all([fetch("/api/menu"), fetch("/api/evenements")]);
        const menu = menuRes.ok ? await menuRes.json() : [];
        const events = eventsRes.ok ? await eventsRes.json() : [];
        setStats({ menuItems: menu.length, events: events.length, pendingMessages: 0 });
      } catch { /* silently fail */ }
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="font-heading text-2xl text-wood mb-6">Tableau de bord</h1>
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gold/10"><p className="text-sm text-wood-light">Plats sur la carte</p><p className="text-3xl font-bold text-terracotta">{stats.menuItems}</p></div>
          <div className="bg-white rounded-xl p-4 border border-gold/10"><p className="text-sm text-wood-light">&Eacute;v&eacute;nements &agrave; venir</p><p className="text-3xl font-bold text-terracotta">{stats.events}</p></div>
          <div className="bg-white rounded-xl p-4 border border-gold/10"><p className="text-sm text-wood-light">Messages en attente</p><p className="text-3xl font-bold text-terracotta">{stats.pendingMessages}</p></div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={`block rounded-xl p-6 border transition-colors ${link.color}`}>
            <div className="text-3xl mb-3">{link.icon}</div>
            <h2 className="font-heading text-lg text-wood mb-1">{link.label}</h2>
            <p className="text-sm text-wood-light">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
