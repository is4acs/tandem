"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import EventForm from "./EventForm";
import type { Evenement } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminEventList() {
  const [events, setEvents] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evenement | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/evenements"); if (res.ok) setEvents(await res.json()); } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet &eacute;v&eacute;nement ?")) return;
    try { const res = await fetch(`/api/evenements?id=${id}`, { method: "DELETE" }); if (res.ok) loadEvents(); } catch { /* */ }
  }

  function handleEdit(event: Evenement) { setEditingEvent(event); setShowForm(true); }
  function handleFormSave() { setShowForm(false); setEditingEvent(null); loadEvents(); }
  function handleFormCancel() { setShowForm(false); setEditingEvent(null); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl text-wood">{events.length} &eacute;v&eacute;nement{events.length !== 1 ? "s" : ""} &agrave; venir</h2>
        {!showForm && <Button onClick={() => setShowForm(true)}>+ Ajouter un &eacute;v&eacute;nement</Button>}
      </div>
      {showForm && <div className="mb-6"><EventForm event={editingEvent} onSave={handleFormSave} onCancel={handleFormCancel} /></div>}
      {loading ? (
        <p className="text-wood-light py-8 text-center">Chargement...</p>
      ) : events.length === 0 ? (
        <p className="text-wood-light py-8 text-center">Aucun &eacute;v&eacute;nement &agrave; venir</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg p-4 border border-gold/10 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-medium text-terracotta">{formatDate(event.date)}</span>
                  <span className="font-medium text-wood">{event.titre}</span>
                </div>
                {event.description && <p className="text-sm text-wood-light truncate mt-1">{event.description}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(event)} className="text-sm text-wood-light hover:text-terracotta transition-colors">Modifier</button>
                <button onClick={() => handleDelete(event.id)} className="text-sm text-wood-light hover:text-red-600 transition-colors">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
