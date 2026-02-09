import type { Evenement } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Evenement;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
      {event.image_url && (
        <div className="aspect-video bg-cream-dark overflow-hidden">
          <img src={event.image_url} alt={event.titre} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-terracotta font-medium mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time dateTime={event.date}>{formatDate(event.date)}</time>
        </div>
        <h3 className="font-heading text-xl text-wood mb-2">{event.titre}</h3>
        {event.description && <p className="text-wood-light text-sm leading-relaxed">{event.description}</p>}
      </div>
    </article>
  );
}
