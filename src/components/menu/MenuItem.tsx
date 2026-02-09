import type { MenuItem as MenuItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import PromoTag from "./PromoTag";

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-gold/10 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-wood">{item.nom}</h3>
          {item.promo && <PromoTag />}
        </div>
        {item.description && (
          <p className="text-sm text-wood-light mt-1">{item.description}</p>
        )}
      </div>
      <div className="text-right shrink-0">
        {item.promo && item.prix_promo != null ? (
          <div>
            <span className="text-sm text-wood/40 line-through">{formatPrice(item.prix)}</span>
            <span className="block text-lg font-bold text-terracotta">{formatPrice(item.prix_promo)}</span>
          </div>
        ) : (
          <span className="text-lg font-semibold text-wood">{formatPrice(item.prix)}</span>
        )}
      </div>
    </div>
  );
}
