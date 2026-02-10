import type { GuestbookEntry } from "@/lib/types";
import GuestbookMessage from "./GuestbookMessage";

interface GuestbookListProps {
  entries: GuestbookEntry[];
}

export default function GuestbookList({ entries }: GuestbookListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-light">Soyez le premier à laisser un message !</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <GuestbookMessage key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
