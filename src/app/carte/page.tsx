import type { Metadata } from "next";
import MenuCategory from "@/components/menu/MenuCategory";
import type { MenuItem } from "@/lib/types";
import { MENU_CATEGORIES } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase-server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "La Carte",
  description: "Découvrez la carte du Tandem : entrées, plats, suggestions du chef, desserts et boissons. Bistrot-Resto à Embrun.",
};

export const revalidate = 300;

// Sous-titres pour certaines catégories (comme sur la carte imprimée)
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

  // Séparer nourriture et boissons
  const foodCategories = ["Entrées", "Plats", "Suggestions du Chef", "Desserts"];
  const foodGroups = grouped.filter((g) => foodCategories.includes(g.name));
  const drinkGroups = grouped.filter((g) => !foodCategories.includes(g.name));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Logo en haut de la carte */}
      <div className="text-center mb-10">
        <Image
          src="/images/logo-tandem.png"
          alt="Le Tandem - Bistrot Resto"
          width={250}
          height={90}
          className="mx-auto mb-2"
          style={{ objectFit: "contain" }}
        />
      </div>

      {hasItems ? (
        <>
          {/* Section nourriture */}
          {foodGroups.map((group) => (
            <MenuCategory key={group.name} name={group.name} subtitle={group.subtitle} items={group.items} />
          ))}

          {/* Séparateur avant les boissons */}
          {drinkGroups.some((g) => g.items.length > 0) && (
            <div className="my-12 flex items-center gap-4">
              <div className="flex-1 h-px bg-wood/10" />
              <span className="text-wood/30 text-sm uppercase tracking-widest">Boissons</span>
              <div className="flex-1 h-px bg-wood/10" />
            </div>
          )}

          {/* Section boissons en grille sur desktop */}
          <div className="md:grid md:grid-cols-2 md:gap-x-8">
            {drinkGroups.map((group) => (
              <MenuCategory key={group.name} name={group.name} subtitle={group.subtitle} items={group.items} />
            ))}
          </div>

          {/* Note allergènes */}
          <div className="mt-12 py-4 border-t border-wood/10 text-center">
            <p className="text-wood/50 text-sm italic">
              Pensez à nous prévenir de vos allergies et à nous demander le tableau spécifique.
            </p>
            <p className="text-wood/30 text-xs mt-3">
              Prix nets et service compris - l&apos;abus d&apos;alcool est dangereux pour la santé.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-wood-light text-lg">La carte est en cours de préparation...</p>
          <p className="text-wood-light/60 mt-2">Revenez bientôt pour découvrir nos plats !</p>
        </div>
      )}
    </div>
  );
}
