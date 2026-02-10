"use client";

import { useMemo, useState } from "react";
import type { MenuItem } from "@/lib/types";
import MenuCategoryEntries from "./MenuCategoryEntries";

interface MenuGroup {
  name: string;
  subtitle?: string;
  items: MenuItem[];
}

interface MenuV2MobileProps {
  foodGroups: MenuGroup[];
  drinkGroups: MenuGroup[];
}

type TabKey = "food" | "drinks";

function slugifyCategory(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-bistro/60 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function firstNonEmptyCategory(groups: MenuGroup[]): string | null {
  return groups.find((group) => group.items.length > 0)?.name || null;
}

export default function MenuV2Mobile({ foodGroups, drinkGroups }: MenuV2MobileProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("food");
  const [openCategoryNames, setOpenCategoryNames] = useState<string[]>(() => {
    const defaults = [firstNonEmptyCategory(foodGroups), firstNonEmptyCategory(drinkGroups)];
    return defaults.filter((name): name is string => Boolean(name));
  });

  const visibleGroups = useMemo(() => {
    const source = activeTab === "food" ? foodGroups : drinkGroups;
    return source.filter((group) => group.items.length > 0);
  }, [activeTab, foodGroups, drinkGroups]);

  const allOpen =
    visibleGroups.length > 0 &&
    visibleGroups.every((group) => openCategoryNames.includes(group.name));

  const toggleCategory = (name: string) => {
    setOpenCategoryNames((prev) =>
      prev.includes(name) ? prev.filter((entry) => entry !== name) : [...prev, name]
    );
  };

  const openAndFocusCategory = (name: string) => {
    setOpenCategoryNames((prev) => (prev.includes(name) ? prev : [...prev, name]));
    const targetId = `mobile-category-${slugifyCategory(name)}`;
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const toggleAll = () => {
    setOpenCategoryNames((prev) => {
      const next = new Set(prev);
      if (allOpen) {
        visibleGroups.forEach((group) => next.delete(group.name));
      } else {
        visibleGroups.forEach((group) => next.add(group.name));
      }
      return Array.from(next);
    });
  };

  return (
    <section className="md:hidden mb-8">
      <div className="sticky top-[4.2rem] z-30 rounded-2xl border border-bistro/10 bg-cream/90 px-3 py-3 shadow-lg shadow-bistro/10 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-cream-dark/80 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("food")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              activeTab === "food"
                ? "bg-chalk text-bistro shadow-sm"
                : "text-bistro/65"
            }`}
            aria-pressed={activeTab === "food"}
          >
            A manger
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("drinks")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              activeTab === "drinks"
                ? "bg-chalk text-bistro shadow-sm"
                : "text-bistro/65"
            }`}
            aria-pressed={activeTab === "drinks"}
          >
            A boire
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px]">
          <p className="text-bistro/60 uppercase tracking-[0.12em]">
            {activeTab === "food" ? "Carte du bistrot" : "Cave et boissons"}
          </p>
          <button
            type="button"
            onClick={toggleAll}
            className="font-semibold text-mountain hover:text-mountain-dark"
          >
            {allOpen ? "Tout replier" : "Tout deplier"}
          </button>
        </div>

        <div className="mt-2 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {visibleGroups.map((group) => {
            const isOpen = openCategoryNames.includes(group.name);

            return (
              <button
                key={`chip-${group.name}`}
                type="button"
                onClick={() => openAndFocusCategory(group.name)}
                className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  isOpen
                    ? "border-mountain/30 bg-mountain/15 text-mountain-dark"
                    : "border-bistro/15 bg-chalk/75 text-bistro/70"
                }`}
              >
                {group.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {visibleGroups.map((group) => {
          const isOpen = openCategoryNames.includes(group.name);
          const pricedItems = group.items.filter((item) => item.prix > 0).length;

          return (
            <article
              key={group.name}
              id={`mobile-category-${slugifyCategory(group.name)}`}
              className="scroll-mt-44 overflow-hidden rounded-2xl border border-bistro/10 bg-chalk/95 shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleCategory(group.name)}
                className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <div>
                  <h3 className="font-heading text-xl text-bistro">{group.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-light">
                    {group.subtitle || `${pricedItems} choix`}
                  </p>
                </div>
                <span className="mt-1">
                  <Chevron open={isOpen} />
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-bistro/10 px-4 pb-3">
                  <MenuCategoryEntries items={group.items} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
