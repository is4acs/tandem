"use client";

import { useEffect, useState } from "react";
import type { Evenement } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import EventForm from "./EventForm";

async function fetchEvents(): Promise<Evenement[]> {
  const res = await fetch("/api/evenements");
  if (!res.ok) return [];
  try {
    return (await res.json()) as Evenement[];
  } catch {
    return [];
  }
}

export default function AdminEventList() {
  const [events, setEvents] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evenement | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        const data = await fetchEvents();
        if (!cancelled) setEvents(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadEvents();
    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  function refreshEvents() {
    setLoading(true);
    setRefreshToken((prev) => prev + 1);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet evenement ?")) return;
    const res = await fetch(`/api/evenements?id=${id}`, { method: "DELETE" });
    if (res.ok) refreshEvents();
  }

  function handleEdit(event: Evenement) {
    setEditingEvent(event);
    setShowForm(true);
  }

  function handleFormSave() {
    setShowForm(false);
    setEditingEvent(null);
    refreshEvents();
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingEvent(null);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-bistro/10 bg-chalk p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate">
            <span className="font-semibold text-bistro">{events.length}</span> evenement
            {events.length !== 1 ? "s" : ""} a venir
          </p>
          {!showForm && <Button onClick={() => setShowForm(true)}>+ Ajouter un evenement</Button>}
        </div>
      </section>

      {showForm && (
        <EventForm event={editingEvent} onSave={handleFormSave} onCancel={handleFormCancel} />
      )}

      {loading ? (
        <p className="rounded-xl border border-bistro/10 bg-chalk p-6 text-center text-sm text-slate">
          Chargement des evenements...
        </p>
      ) : events.length === 0 ? (
        <p className="rounded-xl border border-bistro/10 bg-chalk p-6 text-center text-sm text-slate">
          Aucun evenement a venir.
        </p>
      ) : (
        <div className="space-y-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-xl border border-bistro/10 bg-chalk p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-mountain/30 bg-mountain/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-mountain-dark">
                      {formatDate(event.date)}
                    </span>
                    <h3 className="font-semibold text-bistro">{event.titre}</h3>
                  </div>
                  {event.description && (
                    <p className="mt-1 text-sm leading-relaxed text-slate">{event.description}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="rounded-lg border border-bistro/15 bg-cream px-3 py-1.5 text-sm font-medium text-bistro hover:bg-bistro/5"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
