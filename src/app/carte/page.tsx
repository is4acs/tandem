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

const EMBRUN_WINKS = [
  "Ici, les assiettes montent vite au sommet: elles redescendent rarement pleines.",
  "Entre le lac de Serre-Ponçon et les sommets d'Embrun, votre appétit est en terrain connu.",
  "Conseil de refuge: gardez un peu de place pour le dessert, même après l'ascension des plats.",
];

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-20">
      <header className="relative overflow-hidden rounded-2xl bg-bistro text-chalk px-5 sm:px-6 md:px-10 py-8 md:py-10 mb-8 md:mb-12 shadow-xl shadow-bistro/20">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224 L140,175 L280,232 L420,162 L560,236 L700,168 L840,226 L980,156 L1120,226 L1260,170 L1440,220 L1440,320 L0,320 Z" />
          </svg>
        </div>
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-px bg-mountain-light/40" />
            <TandemBike className="w-16 h-6 text-mountain-light" />
            <div className="w-10 h-px bg-mountain-light/40" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl">La Carte</h1>
          <p className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.22em] text-mountain-light mt-2">Bistrot traditionnel · saveurs de montagne</p>
        </div>
      </header>

      <section className="mb-8 md:mb-10 grid gap-3 sm:grid-cols-3">
        {EMBRUN_WINKS.map((line) => (
          <p
            key={line}
            className="rounded-xl border border-mountain/20 bg-chalk/95 px-4 py-3 text-sm text-slate leading-relaxed shadow-sm"
          >
            {line}
          </p>
        ))}
      </section>

      {hasItems ? (
        <>
          {foodGroups.map((group) => (
            <MenuCategory key={group.name} name={group.name} subtitle={group.subtitle} items={group.items} />
          ))}

          {drinkGroups.some((g) => g.items.length > 0) && (
            <div className="my-9 md:my-12 flex items-center gap-3 md:gap-4">
              <div className="flex-1 h-px bg-bistro/10" />
              <span className="text-bistro/45 text-xs uppercase tracking-[0.24em]">Boissons</span>
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
            <p className="text-bistro/35 text-xs mt-3">
              Prix nets et service compris &mdash; l&apos;abus d&apos;alcool est dangereux pour la sant&eacute;.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-light text-lg">La carte est en cours de pr&eacute;paration...</p>
          <p className="text-slate-light/60 mt-2">Revenez bient&ocirc;t pour d&eacute;couvrir nos plats.</p>
        </div>
      )}
    </div>
  );
}
