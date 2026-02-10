"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { Evenement } from "@/lib/types";

interface EventFormProps {
  event?: Evenement | null;
  onSave: () => void;
  onCancel: () => void;
}

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
    const body = {
      ...(event && { id: event.id }),
      date,
      titre,
      description: description || null,
      image_url: imageUrl || null,
    };

    try {
      const res = await fetch("/api/evenements", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur");
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-bistro/10 bg-chalk p-5 shadow-sm sm:p-6"
    >
      <h3 className="font-heading text-2xl text-bistro">
        {event ? "Modifier l'evenement" : "Ajouter un evenement"}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-bistro">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-bistro">Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
            placeholder="Soiree jeux"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-bistro">Description (optionnel)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-bistro">URL image (optionnel)</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
          placeholder="https://..."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : event ? "Enregistrer les modifications" : "Ajouter"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
