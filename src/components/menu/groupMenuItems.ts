import type { MenuItem as MenuItemType } from "@/lib/types";

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

export interface GroupedMenuItem {
  type: "single" | "grouped";
  item?: MenuItemType;
  baseName?: string;
  description?: string;
  variants?: Array<{ label: string; item: MenuItemType }>;
  sortOrder: number;
}

export function groupMenuItems(items: MenuItemType[]): GroupedMenuItem[] {
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

  const result: GroupedMenuItem[] = [];
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
