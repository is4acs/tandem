"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { MENU_CATEGORIES } from "@/lib/constants";
import type { MenuItem } from "@/lib/types";

interface MenuItemFormProps {
  item?: MenuItem | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function MenuItemForm({ item, onSave, onCancel }: MenuItemFormProps) {
  const [categorie, setCategorie] = useState(item?.categorie || MENU_CATEGORIES[0]);
  const [nom, setNom] = useState(item?.nom || "");
  const [description, setDescription] = useState(item?.description || "");
  const [prix, setPrix] = useState(item?.prix?.toString() || "");
  const [promo, setPromo] = useState(item?.promo || false);
  const [prixPromo, setPrixPromo] = useState(item?.prix_promo?.toString() || "");
  const [ordre, setOrdre] = useState(item?.ordre?.toString() || "0");
  const [visible, setVisible] = useState(item?.visible ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = item ? "PUT" : "POST";
    const payload = {
      ...(item && { id: item.id }),
      categorie,
      nom,
      description: description || null,
      prix,
      promo,
      prix_promo: promo ? prixPromo : null,
      ordre: parseInt(ordre, 10) || 0,
      visible,
    };

    try {
      const res = await fetch("/api/menu", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        {item ? "Modifier le produit" : "Ajouter un produit"}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-bistro">Categorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
          >
            {MENU_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-bistro">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
            placeholder="Steak frites"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-bistro">Description (optionnel)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
          placeholder="Piece de boeuf, frites maison"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-bistro">Prix (EUR)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
            className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
            placeholder="18.00"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-bistro">Ordre</label>
          <input
            type="number"
            min="0"
            value={ordre}
            onChange={(e) => setOrdre(e.target.value)}
            className="w-full rounded-lg border border-bistro/20 bg-cream px-3 py-2 text-bistro focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
          />
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 py-2">
            <input
              type="checkbox"
              checked={promo}
              onChange={(e) => setPromo(e.target.checked)}
              className="h-4 w-4 rounded border-bistro/30 text-accent focus:ring-accent/30"
            />
            <span className="text-sm font-medium text-bistro">Produit en promo</span>
          </label>
        </div>
      </div>

      {promo && (
        <div className="max-w-xs">
          <label className="mb-1 block text-sm font-medium text-bistro">Prix promo (EUR)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={prixPromo}
            onChange={(e) => setPrixPromo(e.target.value)}
            required={promo}
            className="w-full rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-bistro focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="15.00"
          />
        </div>
      )}

      <div className="rounded-xl border border-bistro/10 bg-cream p-4">
        <p className="text-sm font-semibold text-bistro">Disponibilite</p>
        <p className="mt-1 text-xs text-slate">
          En rupture, le produit disparait totalement de la carte publique mais reste editable ici.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setVisible(true)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              visible
                ? "bg-mountain text-chalk"
                : "border border-bistro/15 bg-chalk text-bistro hover:bg-bistro/5"
            }`}
          >
            Disponible (sur la carte)
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              !visible
                ? "bg-red-600 text-white"
                : "border border-bistro/15 bg-chalk text-bistro hover:bg-bistro/5"
            }`}
          >
            Rupture temporaire (hors carte)
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : item ? "Enregistrer les modifications" : "Ajouter"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
