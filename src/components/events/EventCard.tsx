import type { Evenement } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Evenement;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="relative overflow-hidden bg-chalk rounded-2xl border border-mountain/20 shadow-lg shadow-bistro/[0.07] hover:shadow-xl hover:-translate-y-0.5 transition-all">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mountain-dark via-mountain to-mountain-light" />
      {event.image_url && (
        <div className="aspect-video bg-cream-dark overflow-hidden">
          {/* External event images can come from multiple domains without prior allowlist. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image_url} alt={event.titre} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 text-sm text-mountain-dark font-medium mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time dateTime={event.date}>{formatDate(event.date)}</time>
        </div>
        <h3 className="font-heading text-xl md:text-2xl text-bistro mb-2">{event.titre}</h3>
        {event.description && <p className="text-slate-light text-sm leading-relaxed">{event.description}</p>}
      </div>
    </article>
  );
}
