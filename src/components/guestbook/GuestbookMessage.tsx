import type { GuestbookEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface GuestbookMessageProps {
  entry: GuestbookEntry;
}

export default function GuestbookMessage({ entry }: GuestbookMessageProps) {
  return (
    <article className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-mountain/10">
      <p className="text-bistro leading-relaxed mb-3">&ldquo;{entry.message}&rdquo;</p>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-accent">{entry.nom}</span>
        <time className="text-bistro/40 shrink-0" dateTime={entry.created_at}>{formatDate(entry.created_at)}</time>
      </div>
    </article>
  );
}
