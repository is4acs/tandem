import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuCategoryEntries from "./MenuCategoryEntries";

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
  subtitle?: string;
}

function ChefIcon() {
  return (
    <svg className="w-4 h-4 text-mountain" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 11h10v8H7z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 11V9a4 4 0 018 0v2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 11a2 2 0 100-4 3 3 0 116 0 3 3 0 116 0 2 2 0 100 4" />
    </svg>
  );
}

export default function MenuCategory({ name, items, subtitle }: MenuCategoryProps) {
  if (items.length === 0) return null;

  const isChefSuggestion = name === "Suggestions du Chef";

  return (
    <section className={`mb-8 md:mb-10 ${isChefSuggestion ? "bg-mountain/[0.05] -mx-2 sm:-mx-4 px-3 sm:px-4 py-5 md:py-6 rounded-xl border border-mountain/15" : ""}`}>
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-1">
        <div className="hidden sm:block flex-1 h-[2px] bg-bistro/15" />
        <h3 className="font-heading text-lg sm:text-xl text-bistro uppercase tracking-[0.09em] sm:tracking-[0.16em] font-semibold flex items-center justify-center gap-1.5 sm:gap-2 text-center">
          {isChefSuggestion && <ChefIcon />}
          {name}
        </h3>
        <div className="hidden sm:block flex-1 h-[2px] bg-bistro/15" />
      </div>
      {subtitle && (
        <p className="text-center text-xs text-slate-light uppercase tracking-widest mb-4">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-4" />}
      <MenuCategoryEntries items={items} />
    </section>
  );
}
