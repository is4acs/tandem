"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import type { GuestbookEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

async function fetchGuestbookSets() {
  const [approvedRes, pendingRes] = await Promise.all([
    fetch("/api/guestbook"),
    fetch("/api/guestbook?pending=true"),
  ]);

  const approved = approvedRes.ok ? ((await approvedRes.json()) as GuestbookEntry[]) : [];
  const pending = pendingRes.ok ? ((await pendingRes.json()) as GuestbookEntry[]) : [];
  return { approved, pending };
}

export default function GuestbookModeration() {
  const [pending, setPending] = useState<GuestbookEntry[]>([]);
  const [approved, setApproved] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const data = await fetchGuestbookSets();
        if (cancelled) return;
        setApproved(data.approved);
        setPending(data.pending);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadMessages();
    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  function refreshMessages() {
    setLoading(true);
    setRefreshToken((prev) => prev + 1);
  }

  async function handleApprove(id: string) {
    const res = await fetch("/api/guestbook", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: true }),
    });
    if (res.ok) refreshMessages();
  }

  async function handleReject(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    const res = await fetch(`/api/guestbook?id=${id}`, { method: "DELETE" });
    if (res.ok) refreshMessages();
  }

  async function handleUnapprove(id: string) {
    const res = await fetch("/api/guestbook", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: false }),
    });
    if (res.ok) refreshMessages();
  }

  if (loading) {
    return (
      <p className="rounded-xl border border-bistro/10 bg-chalk p-6 text-center text-sm text-slate">
        Chargement des messages...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm sm:p-5">
        <h2 className="font-heading text-2xl text-bistro">Messages en attente ({pending.length})</h2>

        {pending.length === 0 ? (
          <p className="mt-3 rounded-lg border border-bistro/10 bg-chalk p-4 text-sm text-slate">
            Aucun message en attente.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {pending.map((entry) => (
              <article key={entry.id} className="rounded-xl border border-amber-200 bg-chalk p-4">
                <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-bistro">{entry.nom}</span>
                  <span className="text-xs text-slate-light">{formatDate(entry.created_at)}</span>
                </header>
                <p className="mt-2 text-sm leading-relaxed text-slate">{entry.message}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => handleApprove(entry.id)}>
                    Approuver
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleReject(entry.id)}>
                    Supprimer
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-green-200 bg-green-50/40 p-4 shadow-sm sm:p-5">
        <h2 className="font-heading text-2xl text-bistro">Messages publies ({approved.length})</h2>

        {approved.length === 0 ? (
          <p className="mt-3 rounded-lg border border-bistro/10 bg-chalk p-4 text-sm text-slate">
            Aucun message publie.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {approved.map((entry) => (
              <article key={entry.id} className="rounded-xl border border-green-200 bg-chalk p-4">
                <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-bistro">{entry.nom}</span>
                  <span className="text-xs text-slate-light">{formatDate(entry.created_at)}</span>
                </header>
                <p className="mt-2 text-sm leading-relaxed text-slate">{entry.message}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUnapprove(entry.id)}
                    className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100"
                  >
                    Masquer
                  </button>
                  <button
                    onClick={() => handleReject(entry.id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    Supprimer
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
