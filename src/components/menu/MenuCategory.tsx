import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuItem from "./MenuItem";

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
  subtitle?: string;
}

export default function MenuCategory({ name, items, subtitle }: MenuCategoryProps) {
  if (items.length === 0) return null;

  const isChefSuggestion = name === "Suggestions du Chef";

  return (
    <section className={`mb-10 ${isChefSuggestion ? "bg-wood/[0.03] -mx-4 px-4 py-6 rounded-xl border border-wood/10" : ""}`}>
      {/* Titre style carte avec lignes de part et d'autre */}
      <div className="flex items-center gap-4 mb-1">
        <div className="flex-1 h-[2px] bg-wood/20" />
        <h3 className="font-heading text-lg md:text-xl text-wood uppercase tracking-wider whitespace-nowrap font-bold">
          {isChefSuggestion && <span className="mr-2">👨‍🍳</span>}
          {name}
        </h3>
        <div className="flex-1 h-[2px] bg-wood/20" />
      </div>
      {subtitle && (
        <p className="text-center text-xs text-wood/50 uppercase tracking-widest mb-4">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-4" />}
      <div>
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
