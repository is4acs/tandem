import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuItem from "./MenuItem";

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
}

export default function MenuCategory({ name, items }: MenuCategoryProps) {
  if (items.length === 0) return null;

  const isChefSuggestion = name === "Suggestions du Chef";

  return (
    <section className={`mb-10 ${isChefSuggestion ? "bg-terracotta/5 -mx-4 px-4 py-6 rounded-xl border border-terracotta/20" : ""}`}>
      <h3 className="font-heading text-2xl text-terracotta mb-4 pb-2 border-b-2 border-gold/30">
        {isChefSuggestion && <span className="mr-2">👨‍🍳</span>}
        {name}
      </h3>
      <div>
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
