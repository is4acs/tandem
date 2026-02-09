"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import MenuItemForm from "./MenuItemForm";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { MENU_CATEGORIES } from "@/lib/constants";

export default function AdminMenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/menu"); if (res.ok) setItems(await res.json()); } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { loadItems(); }, [loadItems]);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce plat ?")) return;
    try { const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" }); if (res.ok) loadItems(); } catch { /* */ }
  }

  function handleEdit(item: MenuItem) { setEditingItem(item); setShowForm(true); }
  function handleFormSave() { setShowForm(false); setEditingItem(null); loadItems(); }
  function handleFormCancel() { setShowForm(false); setEditingItem(null); }

  const grouped = MENU_CATEGORIES.map((cat) => ({ name: cat, items: items.filter((i) => i.categorie === cat) }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl text-wood">{items.length} plat{items.length !== 1 ? "s" : ""} sur la carte</h2>
        {!showForm && <Button onClick={() => setShowForm(true)}>+ Ajouter un plat</Button>}
      </div>
      {showForm && <div className="mb-6"><MenuItemForm item={editingItem} onSave={handleFormSave} onCancel={handleFormCancel} /></div>}
      {loading ? (
        <p className="text-wood-light py-8 text-center">Chargement...</p>
      ) : (
        grouped.map((group) => group.items.length > 0 ? (
          <div key={group.name} className="mb-8">
            <h3 className="font-heading text-lg text-terracotta mb-3 pb-1 border-b border-gold/20">{group.name} ({group.items.length})</h3>
            <div className="space-y-2">
              {group.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 border border-gold/10 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-wood">{item.nom}</span>
                      {item.promo && <span className="text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">Promo</span>}
                    </div>
                    {item.description && <p className="text-sm text-wood-light truncate">{item.description}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    {item.promo && item.prix_promo != null ? (
                      <div><span className="text-xs text-wood/40 line-through">{formatPrice(item.prix)}</span><span className="block font-bold text-terracotta">{formatPrice(item.prix_promo)}</span></div>
                    ) : (<span className="font-semibold">{formatPrice(item.prix)}</span>)}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEdit(item)} className="text-sm text-wood-light hover:text-terracotta transition-colors">Modifier</button>
                    <button onClick={() => handleDelete(item.id)} className="text-sm text-wood-light hover:text-red-600 transition-colors">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null)
      )}
    </div>
  );
}
