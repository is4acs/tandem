import type { GuestbookEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface GuestbookMessageProps {
  entry: GuestbookEntry;
}

export default function GuestbookMessage({ entry }: GuestbookMessageProps) {
  return (
    <article className="bg-white rounded-xl p-5 shadow-sm border border-gold/10">
      <p className="text-wood leading-relaxed mb-3">&ldquo;{entry.message}&rdquo;</p>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-terracotta">{entry.nom}</span>
        <time className="text-wood/40" dateTime={entry.created_at}>{formatDate(entry.created_at)}</time>
      </div>
    </article>
  );
}
