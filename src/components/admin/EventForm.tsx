"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { Evenement } from "@/lib/types";

interface EventFormProps { event?: Evenement | null; onSave: () => void; onCancel: () => void; }

export default function EventForm({ event, onSave, onCancel }: EventFormProps) {
  const [date, setDate] = useState(event?.date || "");
  const [titre, setTitre] = useState(event?.titre || "");
  const [description, setDescription] = useState(event?.description || "");
  const [imageUrl, setImageUrl] = useState(event?.image_url || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const method = event ? "PUT" : "POST";
    const body = { ...(event && { id: event.id }), date, titre, description: description || null, image_url: imageUrl || null };
    try {
      const res = await fetch("/api/evenements", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Erreur"); }
      onSave();
    } catch (err) { setError(err instanceof Error ? err.message : "Erreur"); setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gold/10 space-y-4">
      <h3 className="font-heading text-lg text-wood">{event ? "Modifier" : "Ajouter un &eacute;v&eacute;nement"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-wood mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood mb-1">Titre</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="Soir&eacute;e jeux" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-wood mb-1">Description (optionnel)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-wood mb-1">URL image (optionnel)</label>
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="https://..." />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>{loading ? "Enregistrement..." : event ? "Modifier" : "Ajouter"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
}
