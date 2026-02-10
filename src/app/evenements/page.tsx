import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import EventList from "@/components/events/EventList";
import type { Evenement } from "@/lib/types";
import { supabaseAdmin } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Événements",
  description: "Découvrez les événements à venir au Tandem : soirées jeux, concerts et plus encore.",
};

export const revalidate = 3600;

async function getEvenements(): Promise<Evenement[]> {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabaseAdmin
    .from("evenements")
    .select("*")
    .eq("visible", true)
    .gte("date", today)
    .order("date", { ascending: true });

  if (error) return [];
  return data || [];
}

export default async function EvenementsPage() {
  const events = await getEvenements();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <SectionTitle>Événements</SectionTitle>
      <p className="text-center text-slate-light mb-10 text-lg max-w-2xl mx-auto">
        Soirées jeux, concerts, événements spéciaux... Il se passe toujours quelque chose au Tandem !
      </p>
      <EventList events={events} />
    </div>
  );
}
