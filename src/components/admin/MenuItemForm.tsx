"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { MENU_CATEGORIES } from "@/lib/constants";
import type { MenuItem } from "@/lib/types";

interface MenuItemFormProps { item?: MenuItem | null; onSave: () => void; onCancel: () => void; }

export default function MenuItemForm({ item, onSave, onCancel }: MenuItemFormProps) {
  const [categorie, setCategorie] = useState(item?.categorie || MENU_CATEGORIES[0]);
  const [nom, setNom] = useState(item?.nom || "");
  const [description, setDescription] = useState(item?.description || "");
  const [prix, setPrix] = useState(item?.prix?.toString() || "");
  const [promo, setPromo] = useState(item?.promo || false);
  const [prixPromo, setPrixPromo] = useState(item?.prix_promo?.toString() || "");
  const [ordre, setOrdre] = useState(item?.ordre?.toString() || "0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const method = item ? "PUT" : "POST";
    const body = { ...(item && { id: item.id }), categorie, nom, description: description || null, prix, promo, prix_promo: promo ? prixPromo : null, ordre: parseInt(ordre) || 0 };
    try {
      const res = await fetch("/api/menu", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Erreur"); }
      onSave();
    } catch (err) { setError(err instanceof Error ? err.message : "Erreur"); setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gold/10 space-y-4">
      <h3 className="font-heading text-lg text-wood">{item ? "Modifier le plat" : "Ajouter un plat"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-wood mb-1">Cat&eacute;gorie</label>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30">
            {MENU_CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-wood mb-1">Nom du plat</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="Steak frites" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-wood mb-1">Description (optionnel)</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="Pi&egrave;ce de boeuf, frites maison" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-wood mb-1">Prix (&euro;)</label>
          <input type="number" step="0.01" min="0" value={prix} onChange={(e) => setPrix(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="18.00" />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood mb-1">Ordre</label>
          <input type="number" min="0" value={ordre} onChange={(e) => setOrdre(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-cream text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer py-2">
            <input type="checkbox" checked={promo} onChange={(e) => setPromo(e.target.checked)} className="w-4 h-4 rounded border-gold/30 text-terracotta focus:ring-terracotta/30" />
            <span className="text-sm font-medium text-wood">En promo</span>
          </label>
        </div>
      </div>
      {promo && (
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-wood mb-1">Prix promo (&euro;)</label>
          <input type="number" step="0.01" min="0" value={prixPromo} onChange={(e) => setPrixPromo(e.target.value)} required={promo} className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-terracotta/5 text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="15.00" />
        </div>
      )}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>{loading ? "Enregistrement..." : item ? "Modifier" : "Ajouter"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
}
