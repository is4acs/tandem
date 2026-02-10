import type { Evenement } from "@/lib/types";
import EventCard from "./EventCard";

interface EventListProps {
  events: Evenement[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-light text-base md:text-lg">Aucun événement à venir pour le moment.</p>
        <p className="text-slate-light/60 mt-2">Suivez-nous sur les réseaux sociaux pour être informé des prochains événements !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
