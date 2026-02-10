import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import GuestbookList from "@/components/guestbook/GuestbookList";
import GuestbookForm from "@/components/guestbook/GuestbookForm";
import type { GuestbookEntry } from "@/lib/types";
import { supabaseAdmin } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Livre d'Or",
  description: "Laissez-nous un message dans le livre d'or du Tandem. Restaurant à Embrun.",
};

export const revalidate = 60;

async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const { data, error } = await supabaseAdmin
    .from("guestbook")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return [];
  return data || [];
}

export default async function LivreDorPage() {
  const entries = await getGuestbookEntries();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <SectionTitle>Livre d&apos;Or</SectionTitle>
      <p className="text-center text-slate-light mb-10 text-lg">
        Partagez votre expérience au Tandem ! Votre avis compte pour nous.
      </p>
      <div className="mb-12">
        <GuestbookForm />
      </div>
      <div>
        <h3 className="font-heading text-xl text-bistro mb-6">Vos messages</h3>
        <GuestbookList entries={entries} />
      </div>
    </div>
  );
}
