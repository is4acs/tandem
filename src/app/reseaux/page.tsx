import type { Metadata } from "next";
import SocialLinkCard from "@/components/social/SocialLinkCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { RESTAURANT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Réseaux Sociaux",
  description: "Suivez Le Tandem sur Instagram et Facebook.",
};

export default function ReseauxPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <SectionTitle>Suivez-nous</SectionTitle>
      <p className="text-center text-slate-light mb-10 text-lg">
        Retrouvez-nous sur les réseaux sociaux pour suivre nos actualités, nos plats du jour et nos événements !
      </p>
      <div className="space-y-6">
        <SocialLinkCard platform="instagram" url={RESTAURANT.social.instagram} handle="@letandem_embrun" />
        <SocialLinkCard platform="facebook" url={RESTAURANT.social.facebook} handle="Le Tandem Embrun" />
      </div>
    </div>
  );
}
