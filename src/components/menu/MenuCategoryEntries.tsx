import type { MenuItem as MenuItemType } from "@/lib/types";
import MenuItem from "./MenuItem";
import MenuItemGroup from "./MenuItemGroup";
import { groupMenuItems } from "./groupMenuItems";

interface MenuCategoryEntriesProps {
  items: MenuItemType[];
}

export default function MenuCategoryEntries({ items }: MenuCategoryEntriesProps) {
  const grouped = groupMenuItems(items);

  return (
    <div>
      {grouped.map((groupedItem, idx) =>
        groupedItem.type === "single" ? (
          <MenuItem key={groupedItem.item!.id} item={groupedItem.item!} />
        ) : (
          <MenuItemGroup
            key={`group-${idx}`}
            baseName={groupedItem.baseName!}
            description={groupedItem.description}
            variants={groupedItem.variants!}
          />
        )
      )}
    </div>
  );
}
