import type { Metadata } from "next";
import MenuCategory from "@/components/menu/MenuCategory";
import type { MenuItem } from "@/lib/types";
import { MENU_CATEGORIES } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase-server";
import TandemBike from "@/components/ui/TandemBike";

export const metadata: Metadata = {
  title: "La Carte",
  description: "Découvrez la carte du Tandem : entrées, plats, suggestions du chef, desserts et boissons. Bistrot-Resto à Embrun.",
};

export const revalidate = 300;

const CATEGORY_SUBTITLES: Record<string, string> = {
  "Vins Rouges": "Bouteille de 75cl",
  "Vins Blancs": "Bouteille de 75cl",
  "Vins Rosés": "Bouteille de 75cl",
  "Bières de Prestige": "À partager · 35 €",
  "Bières Bouteille": "5,70 €",
  "Vins au Verre": "12cl",
};

async function getMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("visible", true)
    .order("ordre", { ascending: true })
    .order("nom", { ascending: true });

  if (error) return [];
  return data || [];
}

export default async function CartePage() {
  const items = await getMenuItems();
  const grouped = MENU_CATEGORIES.map((cat) => ({
    name: cat,
    subtitle: CATEGORY_SUBTITLES[cat],
    items: items.filter((item) => item.categorie === cat),
  }));
  const hasItems = items.length > 0;

  const foodCategories = ["Entrées", "Plats", "Suggestions du Chef", "Desserts"];
  const foodGroups = grouped.filter((g) => foodCategories.includes(g.name));
  const drinkGroups = grouped.filter((g) => !foodCategories.includes(g.name));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Titre avec vélo tandem */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-bistro/20" />
          <TandemBike className="w-14 h-5 text-mountain" />
          <div className="w-12 h-px bg-bistro/20" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-bistro">La Carte</h1>
        <p className="text-sm text-slate-light mt-2 italic">Bistrot &mdash; Resto</p>
      </div>

      {hasItems ? (
        <>
          {foodGroups.map((group) => (
            <MenuCategory key={group.name} name={group.name} subtitle={group.subtitle} items={group.items} />
          ))}

          {drinkGroups.some((g) => g.items.length > 0) && (
            <div className="my-12 flex items-center gap-4">
              <div className="flex-1 h-px bg-bistro/10" />
              <span className="text-bistro/30 text-sm uppercase tracking-widest">Boissons</span>
              <div className="flex-1 h-px bg-bistro/10" />
            </div>
          )}

          <div className="md:grid md:grid-cols-2 md:gap-x-8">
            {drinkGroups.map((group) => (
              <MenuCategory key={group.name} name={group.name} subtitle={group.subtitle} items={group.items} />
            ))}
          </div>

          <div className="mt-12 py-4 border-t border-bistro/10 text-center">
            <p className="text-slate-light text-sm italic">
              Pensez &agrave; nous pr&eacute;venir de vos allergies et &agrave; nous demander le tableau sp&eacute;cifique.
            </p>
            <p className="text-bistro/25 text-xs mt-3">
              Prix nets et service compris &mdash; l&apos;abus d&apos;alcool est dangereux pour la sant&eacute;.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-light text-lg">La carte est en cours de pr&eacute;paration...</p>
          <p className="text-slate-light/60 mt-2">Revenez bient&ocirc;t pour d&eacute;couvrir nos plats !</p>
        </div>
      )}
    </div>
  );
}
