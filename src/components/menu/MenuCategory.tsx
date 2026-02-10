import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuItem from "./MenuItem";
import MenuItemGroup from "./MenuItemGroup";

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
  subtitle?: string;
}

// Patterns pour détecter les variantes d'un même produit
const VARIANT_PATTERNS = [
  /^(.+?)\s*\((\d+\s*pièces?)\)$/i,       // Escargots de Bourgogne (6 pièces)
  /^(.+?)\s*\((Grande|Petite)\)$/i,         // Tapas du Moment (Grande)
  /^(.+?)\s+(\d+cl)$/i,                     // Corsendonk pils 25cl
  /^(.+?)\s+\+\s+(sirop)$/i,               // Panaché + sirop
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
  // 1. Identifier tous les noms de base qui ont des variantes à suffixe
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

  // 2. Chercher les items "de base" (sans suffixe) qui correspondent à un groupe
  // Ex: "Tapas du Moment" est le nom de base de "Tapas du Moment (Grande)"
  items.forEach((item, index) => {
    if (item.prix === 0) return;
    const extracted = extractBase(item.nom);
    if (extracted) return; // déjà traité comme variante

    if (baseNameMap.has(item.nom.trim())) {
      const existing = baseNameMap.get(item.nom.trim())!;
      existing.unshift({ label: "", item, index });
    }
  });

  // 3. Ne garder que les groupes avec 2+ variantes
  const groupedItemIds = new Set<string>();
  const validGroups = new Map<string, Array<{ label: string; item: MenuItemType; index: number }>>();

  baseNameMap.forEach((variants, baseName) => {
    if (variants.length >= 2) {
      validGroups.set(baseName, variants);
      variants.forEach((v) => groupedItemIds.add(v.item.id));
    }
  });

  // 4. Construire le résultat dans l'ordre original
  const result: GroupedItem[] = [];
  const processed = new Set<string>();

  items.forEach((item, index) => {
    if (processed.has(item.id)) return;

    if (groupedItemIds.has(item.id)) {
      for (const [baseName, variants] of validGroups) {
        const groupKey = baseName + "-group";
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

export default function MenuCategory({ name, items, subtitle }: MenuCategoryProps) {
  if (items.length === 0) return null;

  const isChefSuggestion = name === "Suggestions du Chef";
  const grouped = groupVariants(items);

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
