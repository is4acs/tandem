import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import MenuCategory from "@/components/menu/MenuCategory";
import type { MenuItem } from "@/lib/types";
import { MENU_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "La Carte",
  description: "Découvrez la carte du Tandem : entrées, plats, desserts et boissons. Restaurant à Embrun.",
};

export const revalidate = 300;

async function getMenuItems(): Promise<MenuItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/menu`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function CartePage() {
  const items = await getMenuItems();
  const grouped = MENU_CATEGORIES.map((cat) => ({
    name: cat,
    items: items.filter((item) => item.categorie === cat),
  }));
  const hasItems = items.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <SectionTitle>La Carte</SectionTitle>
      {hasItems ? (
        grouped.map((group) => (
          <MenuCategory key={group.name} name={group.name} items={group.items} />
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-wood-light text-lg">La carte est en cours de préparation...</p>
          <p className="text-wood-light/60 mt-2">Revenez bientôt pour découvrir nos plats !</p>
        </div>
      )}
    </div>
  );
}
