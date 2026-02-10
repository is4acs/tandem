import type { MenuItem as MenuItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface MenuItemGroupProps {
  baseName: string;
  description?: string;
  variants: Array<{ label: string; item: MenuItemType }>;
}

function renderDescription(description: string) {
  const parts = description.split(/(#\S+)/g);
  const textParts: string[] = [];
  const hashtags: string[] = [];

  parts.forEach((part) => {
    if (part.startsWith("#")) {
      hashtags.push(part);
    } else if (part.trim()) {
      textParts.push(part.trim());
    }
  });

  return (
    <>
      {textParts.length > 0 && (
        <p className="text-sm text-bistro/60 mt-0.5 italic">{textParts.join(" ")}</p>
      )}
      {hashtags.length > 0 && (
        <p className="text-xs text-bistro/40 mt-0.5">
          {hashtags.join(" ")}
        </p>
      )}
    </>
  );
}

function variantPriority(label: string): number {
  const normalized = label.trim().toLowerCase();

  if (!normalized) return 5;
  if (normalized === "petite" || normalized === "petit") return 0;
  if (normalized === "grande" || normalized === "grand") return 1;

  return 10;
}

export default function MenuItemGroup({ baseName, description, variants }: MenuItemGroupProps) {
  const orderedVariants = variants
    .map((variant, index) => ({ ...variant, index }))
    .sort((a, b) => {
      const priorityDiff = variantPriority(a.label) - variantPriority(b.label);
      if (priorityDiff !== 0) return priorityDiff;
      return a.index - b.index;
    });

  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-bistro/[0.06] last:border-0">
      <div className="flex-1 min-w-0">
        <span className="font-medium text-bistro">{baseName}</span>
        {description && renderDescription(description)}
      </div>
      <div className="text-right shrink-0 flex items-center gap-3">
        {orderedVariants.map((v, idx) => (
          <span key={idx} className="inline-flex items-baseline gap-1">
            {v.label && (
              <span className="text-xs text-bistro/50">
                {v.label}
              </span>
            )}
            <span className="text-base font-semibold text-bistro">{formatPrice(v.item.prix)}</span>
            {idx < orderedVariants.length - 1 && (
              <span className="text-bistro/20 ml-2">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
