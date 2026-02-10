import type { MenuItem as MenuItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import PromoTag from "./PromoTag";

interface MenuItemProps {
  item: MenuItemType;
}

function renderDescription(description: string) {
  // Séparer les hashtags du reste de la description
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

export default function MenuItem({ item }: MenuItemProps) {
  // Items avec prix à 0 sont des titres/descriptions (ex: nom de bière pression)
  const isHeader = item.prix === 0;

  if (isHeader) {
    return (
      <div className="pt-4 pb-1">
        <h4 className="font-semibold text-bistro">{item.nom}</h4>
        {item.description && renderDescription(item.description)}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-bistro/[0.06] last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-bistro">{item.nom}</span>
          {item.promo && <PromoTag />}
        </div>
        {item.description && renderDescription(item.description)}
      </div>
      <div className="text-right shrink-0">
        {item.promo && item.prix_promo != null ? (
          <div>
            <span className="text-sm text-bistro/30 line-through">{formatPrice(item.prix)}</span>
            <span className="block text-base font-bold text-accent">{formatPrice(item.prix_promo)}</span>
          </div>
        ) : (
          <span className="text-base font-semibold text-bistro">{formatPrice(item.prix)}</span>
        )}
      </div>
    </div>
  );
}
