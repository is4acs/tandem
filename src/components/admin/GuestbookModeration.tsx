"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import type { GuestbookEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function GuestbookModeration() {
  const [pending, setPending] = useState<GuestbookEntry[]>([]);
  const [approved, setApproved] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const [approvedRes, pendingRes] = await Promise.all([fetch("/api/guestbook"), fetch("/api/guestbook?pending=true")]);
      if (approvedRes.ok) setApproved(await approvedRes.json());
      if (pendingRes.ok) setPending(await pendingRes.json());
    } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { loadMessages(); }, [loadMessages]);

  async function handleApprove(id: string) {
    try { const res = await fetch("/api/guestbook", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, approved: true }) }); if (res.ok) loadMessages(); } catch { /* */ }
  }

  async function handleReject(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    try { const res = await fetch(`/api/guestbook?id=${id}`, { method: "DELETE" }); if (res.ok) loadMessages(); } catch { /* */ }
  }

  async function handleUnapprove(id: string) {
    try { const res = await fetch("/api/guestbook", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, approved: false }) }); if (res.ok) loadMessages(); } catch { /* */ }
  }

  if (loading) return <p className="text-wood-light py-8 text-center">Chargement...</p>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-heading text-xl text-wood mb-4">Messages en attente ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="text-wood-light text-sm bg-white rounded-lg p-4 border border-gold/10">Aucun message en attente.</p>
        ) : (
          <div className="space-y-3">
            {pending.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg p-4 border-2 border-amber-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-wood">{entry.nom}</span>
                      <span className="text-xs text-wood/40">{formatDate(entry.created_at)}</span>
                    </div>
                    <p className="text-wood-light text-sm">{entry.message}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" onClick={() => handleApprove(entry.id)}>Approuver</Button>
                    <Button size="sm" variant="danger" onClick={() => handleReject(entry.id)}>Supprimer</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 className="font-heading text-xl text-wood mb-4">Messages publi&eacute;s ({approved.length})</h2>
        {approved.length === 0 ? (
          <p className="text-wood-light text-sm bg-white rounded-lg p-4 border border-gold/10">Aucun message publi&eacute;.</p>
        ) : (
          <div className="space-y-3">
            {approved.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-wood">{entry.nom}</span>
                      <span className="text-xs text-wood/40">{formatDate(entry.created_at)}</span>
                    </div>
                    <p className="text-wood-light text-sm">{entry.message}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleUnapprove(entry.id)} className="text-sm text-wood-light hover:text-amber-600 transition-colors">Masquer</button>
                    <button onClick={() => handleReject(entry.id)} className="text-sm text-wood-light hover:text-red-600 transition-colors">Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
