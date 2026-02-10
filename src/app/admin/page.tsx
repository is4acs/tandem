"use client";

import type { MenuItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  totalMenuItems: number;
  menuVisibleItems: number;
  menuUnavailableItems: number;
  events: number;
  pendingMessages: number;
}

interface DashboardCard {
  href: string;
  title: string;
  description: string;
}

const DASHBOARD_CARDS: DashboardCard[] = [
  {
    href: "/admin/carte",
    title: "Gerer la carte",
    description: "Produits, disponibilite, promotions et ordre d'affichage.",
  },
  {
    href: "/admin/evenements",
    title: "Gerer les evenements",
    description: "Dates, titres et contenus des prochaines soirees.",
  },
  {
    href: "/admin/livre-dor",
    title: "Moderer le livre d'or",
    description: "Validation rapide des nouveaux messages clients.",
  },
];

async function readJson<T>(response: Response, fallback: T): Promise<T> {
  if (!response.ok) return fallback;
  try {
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const [menuRes, eventsRes, pendingRes] = await Promise.all([
          fetch("/api/menu?include_hidden=true"),
          fetch("/api/evenements"),
          fetch("/api/guestbook?pending=true"),
        ]);

        const menu = await readJson<MenuItem[]>(menuRes, []);
        const events = await readJson<{ id: string }[]>(eventsRes, []);
        const pending = await readJson<{ id: string }[]>(pendingRes, []);

        if (cancelled) return;

        const menuVisibleItems = menu.filter((item) => item.visible).length;
        setStats({
          totalMenuItems: menu.length,
          menuVisibleItems,
          menuUnavailableItems: menu.length - menuVisibleItems,
          events: events.length,
          pendingMessages: pending.length,
        });
      } catch {
        if (!cancelled) setStats(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadStats();
    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  function refresh() {
    setLoading(true);
    setRefreshToken((prev) => prev + 1);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-bistro/10 bg-chalk p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mountain-dark">
              Administration
            </p>
            <h1 className="mt-1 font-heading text-3xl text-bistro sm:text-4xl">Tableau de bord</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate">
              Vue rapide de la carte, des evenements et de la moderation.
            </p>
          </div>

          <button
            onClick={refresh}
            className="inline-flex items-center justify-center rounded-lg border border-bistro/15 bg-cream px-3 py-2 text-sm font-medium text-bistro hover:bg-bistro/5"
          >
            Actualiser
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatTile label="Produits total" value={loading ? "..." : stats?.totalMenuItems ?? 0} />
        <StatTile label="Sur la carte" value={loading ? "..." : stats?.menuVisibleItems ?? 0} />
        <StatTile label="En rupture" value={loading ? "..." : stats?.menuUnavailableItems ?? 0} />
        <StatTile label="Evenements" value={loading ? "..." : stats?.events ?? 0} />
        <StatTile label="Messages en attente" value={loading ? "..." : stats?.pendingMessages ?? 0} />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {DASHBOARD_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-bistro/10 bg-chalk p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-mountain/30 hover:shadow-md"
          >
            <h2 className="font-heading text-2xl text-bistro group-hover:text-bistro-dark">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate">{card.description}</p>
            <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-mountain-dark">
              Ouvrir
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-xl border border-bistro/10 bg-chalk p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-light">{label}</p>
      <p className="mt-1 font-heading text-3xl leading-none text-bistro">{value}</p>
    </article>
  );
}
