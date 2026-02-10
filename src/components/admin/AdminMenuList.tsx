"use client";

import { useEffect, useMemo, useState } from "react";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { MENU_CATEGORIES } from "@/lib/constants";
import MenuItemForm from "./MenuItemForm";
import Button from "@/components/ui/Button";

type ListMode = "all" | "visible" | "unavailable";

function getItemsByMode(items: MenuItem[], mode: ListMode): MenuItem[] {
  if (mode === "visible") return items.filter((item) => item.visible);
  if (mode === "unavailable") return items.filter((item) => !item.visible);
  return items;
}

async function fetchMenuItems(): Promise<MenuItem[]> {
  const res = await fetch("/api/menu?include_hidden=true");
  if (!res.ok) return [];
  try {
    return (await res.json()) as MenuItem[];
  } catch {
    return [];
  }
}

export default function AdminMenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [listMode, setListMode] = useState<ListMode>("all");
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadItems() {
      try {
        const data = await fetchMenuItems();
        if (!cancelled) setItems(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadItems();
    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  function refreshItems() {
    setLoading(true);
    setRefreshToken((prev) => prev + 1);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce produit definitivement ?")) return;
    const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
    if (res.ok) refreshItems();
  }

  async function handleAvailability(item: MenuItem, nextVisible: boolean) {
    const res = await fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, visible: nextVisible }),
    });
    if (res.ok) refreshItems();
  }

  function handleEdit(item: MenuItem) {
    setEditingItem(item);
    setShowForm(true);
  }

  function handleFormSave() {
    setShowForm(false);
    setEditingItem(null);
    refreshItems();
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingItem(null);
  }

  const totalItems = items.length;
  const visibleCount = items.filter((item) => item.visible).length;
  const unavailableCount = totalItems - visibleCount;
  const filteredItems = getItemsByMode(items, listMode);

  const grouped = useMemo(
    () =>
      MENU_CATEGORIES.map((category) => ({
        name: category,
        items: filteredItems.filter((item) => item.categorie === category),
      })).filter((group) => group.items.length > 0),
    [filteredItems]
  );

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-bistro/10 bg-chalk p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <StatusChip
              label="Total"
              count={totalItems}
              active={listMode === "all"}
              onClick={() => setListMode("all")}
            />
            <StatusChip
              label="Sur la carte"
              count={visibleCount}
              active={listMode === "visible"}
              onClick={() => setListMode("visible")}
            />
            <StatusChip
              label="En rupture"
              count={unavailableCount}
              active={listMode === "unavailable"}
              onClick={() => setListMode("unavailable")}
            />
          </div>

          {!showForm && (
            <Button onClick={() => setShowForm(true)}>+ Ajouter un produit</Button>
          )}
        </div>
      </section>

      {showForm && (
        <MenuItemForm item={editingItem} onSave={handleFormSave} onCancel={handleFormCancel} />
      )}

      {loading ? (
        <p className="rounded-xl border border-bistro/10 bg-chalk p-6 text-center text-sm text-slate">
          Chargement des produits...
        </p>
      ) : grouped.length === 0 ? (
        <p className="rounded-xl border border-bistro/10 bg-chalk p-6 text-center text-sm text-slate">
          Aucun produit pour ce filtre.
        </p>
      ) : (
        grouped.map((group) => (
          <section key={group.name} className="space-y-2">
            <h3 className="font-heading text-2xl text-bistro">
              {group.name} <span className="text-base text-slate-light">({group.items.length})</span>
            </h3>

            <div className="space-y-2">
              {group.items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-bistro/10 bg-chalk p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-bistro">{item.nom}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                            item.visible
                              ? "border border-mountain/30 bg-mountain/10 text-mountain-dark"
                              : "border border-red-200 bg-red-50 text-red-700"
                          }`}
                        >
                          {item.visible ? "Sur la carte" : "Rupture"}
                        </span>
                        {item.promo && (
                          <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-chalk">
                            Promo
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate">{item.description}</p>
                      )}
                    </div>

                    <div className="shrink-0 text-left xl:text-right">
                      {item.promo && item.prix_promo != null ? (
                        <div>
                          <span className="text-xs text-slate-light line-through">
                            {formatPrice(item.prix)}
                          </span>
                          <span className="block text-lg font-bold text-accent">
                            {formatPrice(item.prix_promo)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-semibold text-bistro">
                          {formatPrice(item.prix)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-lg border border-bistro/15 bg-cream px-3 py-1.5 text-sm font-medium text-bistro hover:bg-bistro/5"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleAvailability(item, !item.visible)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                        item.visible
                          ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                          : "border border-mountain/30 bg-mountain/10 text-mountain-dark hover:bg-mountain/20"
                      }`}
                    >
                      {item.visible ? "Passer en rupture" : "Remettre sur la carte"}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-bistro/15 bg-chalk px-3 py-1.5 text-sm font-medium text-slate hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

function StatusChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "border-bistro bg-bistro text-chalk"
          : "border-bistro/15 bg-cream text-bistro hover:bg-bistro/5"
      }`}
    >
      {label} <span className="ml-1 text-xs opacity-80">({count})</span>
    </button>
  );
}
