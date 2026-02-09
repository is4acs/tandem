import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuItem from "./MenuItem";

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
}

export default function MenuCategory({ name, items }: MenuCategoryProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-10">
      <h3 className="font-heading text-2xl text-terracotta mb-4 pb-2 border-b-2 border-gold/30">{name}</h3>
      <div>
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
