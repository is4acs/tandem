import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import EventList from "@/components/events/EventList";
import type { Evenement } from "@/lib/types";

export const metadata: Metadata = {
  title: "Événements",
  description: "Découvrez les événements à venir au Tandem : soirées jeux, concerts et plus encore.",
};

export const revalidate = 3600;

async function getEvenements(): Promise<Evenement[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/evenements`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function EvenementsPage() {
  const events = await getEvenements();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <SectionTitle>Événements</SectionTitle>
      <p className="text-center text-wood-light mb-10 text-lg max-w-2xl mx-auto">
        Soirées jeux, concerts, événements spéciaux... Il se passe toujours quelque chose au Tandem !
      </p>
      <EventList events={events} />
    </div>
  );
}
