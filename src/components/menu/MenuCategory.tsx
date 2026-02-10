import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuItem from "./MenuItem";
import MenuItemGroup from "./MenuItemGroup";

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
  subtitle?: string;
}

const VARIANT_PATTERNS = [
  /^(.+?)\s*\((\d+\s*pièces?)\)$/i,
  /^(.+?)\s*\((Grande|Petite)\)$/i,
  /^(.+?)\s+(\d+cl)$/i,
  /^(.+?)\s+\+\s+(sirop)$/i,
];

function extractBase(nom: string): { baseName: string; label: string } | null {
  for (const pattern of VARIANT_PATTERNS) {
    const match = nom.match(pattern);
    if (match) {
      return { baseName: match[1].trim(), label: match[2] };
    }
  }
  return null;
}

interface GroupedItem {
  type: "single" | "grouped";
  item?: MenuItemType;
  baseName?: string;
  description?: string;
  variants?: Array<{ label: string; item: MenuItemType }>;
  sortOrder: number;
}

function groupVariants(items: MenuItemType[]): GroupedItem[] {
  const baseNameMap = new Map<string, Array<{ label: string; item: MenuItemType; index: number }>>();

  items.forEach((item, index) => {
    if (item.prix === 0) return;
    const extracted = extractBase(item.nom);
    if (extracted) {
      const existing = baseNameMap.get(extracted.baseName) || [];
      existing.push({ label: extracted.label, item, index });
      baseNameMap.set(extracted.baseName, existing);
    }
  });

  items.forEach((item, index) => {
    if (item.prix === 0) return;
    const extracted = extractBase(item.nom);
    if (extracted) return;

    if (baseNameMap.has(item.nom.trim())) {
      const existing = baseNameMap.get(item.nom.trim())!;
      existing.unshift({ label: "", item, index });
    }
  });

  const groupedItemIds = new Set<string>();
  const validGroups = new Map<string, Array<{ label: string; item: MenuItemType; index: number }>>();

  baseNameMap.forEach((variants, baseName) => {
    if (variants.length >= 2) {
      validGroups.set(baseName, variants);
      variants.forEach((v) => groupedItemIds.add(v.item.id));
    }
  });

  const result: GroupedItem[] = [];
  const processed = new Set<string>();

  items.forEach((item, index) => {
    if (processed.has(item.id)) return;

    if (groupedItemIds.has(item.id)) {
      for (const [baseName, variants] of validGroups) {
        const groupKey = `${baseName}-group`;
        if (variants.some((v) => v.item.id === item.id) && !processed.has(groupKey)) {
          processed.add(groupKey);
          variants.forEach((v) => processed.add(v.item.id));

          const desc = variants.find((v) => v.item.description)?.item.description || undefined;
          result.push({
            type: "grouped",
            baseName,
            description: desc,
            variants: variants.map((v) => ({ label: v.label, item: v.item })),
            sortOrder: Math.min(...variants.map((v) => v.index)),
          });
          break;
        }
      }
    } else {
      processed.add(item.id);
      result.push({ type: "single", item, sortOrder: index });
    }
  });

  return result.sort((a, b) => a.sortOrder - b.sortOrder);
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
  const grouped = groupVariants(items);

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
      <div>
        {grouped.map((g, idx) =>
          g.type === "single" ? (
            <MenuItem key={g.item!.id} item={g.item!} />
          ) : (
            <MenuItemGroup
              key={`group-${idx}`}
              baseName={g.baseName!}
              description={g.description}
              variants={g.variants!}
            />
          )
        )}
      </div>
    </section>
  );
}
