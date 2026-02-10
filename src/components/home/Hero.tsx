import Link from "next/link";
import TandemBike from "@/components/ui/TandemBike";

export default function Hero() {
  return (
    <section className="relative bg-bistro text-chalk overflow-hidden min-h-[85vh] flex items-center">
      {/* Silhouette de montagnes en fond */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: "40%" }}>
          <path fill="rgba(74,124,155,0.08)" d="M0,160 L120,140 L240,200 L360,120 L480,180 L600,100 L720,190 L840,110 L960,170 L1080,90 L1200,150 L1320,130 L1440,160 L1440,320 L0,320Z" />
          <path fill="rgba(74,124,155,0.05)" d="M0,200 L180,170 L360,220 L540,160 L720,210 L900,150 L1080,200 L1260,180 L1440,200 L1440,320 L0,320Z" />
        </svg>
      </div>

      {/* Tandem décoratif en filigrane */}
      <div className="absolute bottom-8 right-8 opacity-[0.06]">
        <TandemBike className="w-72 md:w-96" color="#FFFFFF" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
        {/* Petit séparateur décoratif */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-mountain-light" />
          <TandemBike className="w-16 h-6" color="#6BA3C4" />
          <div className="w-12 h-px bg-mountain-light" />
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-bold text-chalk mb-4 tracking-tight">
          Le Tandem
        </h1>
        <p className="text-lg md:text-xl text-mountain-light mb-2 font-light tracking-[0.2em] uppercase">
          Bistrot &mdash; Resto
        </p>
        <p className="text-base text-chalk/50 mb-10 italic">
          au c&oelig;ur d&apos;Embrun, Hautes-Alpes
        </p>

        <div className="w-16 h-px bg-accent mx-auto mb-10" />

        <p className="text-lg text-chalk/70 max-w-xl mx-auto mb-12 leading-relaxed">
          Cuisine de bistrot, produits locaux et bonne humeur &mdash; le tout avec vue sur les montagnes.
          Soir&eacute;es jeux, concerts et belles d&eacute;couvertes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/carte"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-lg shadow-lg shadow-accent/20"
          >
            D&eacute;couvrir la Carte
          </Link>
          <Link
            href="/evenements"
            className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-mountain-light/40 text-mountain-light font-medium rounded-lg hover:bg-mountain-light/10 transition-colors text-lg"
          >
            Nos &Eacute;v&eacute;nements
          </Link>
        </div>
      </div>
    </section>
  );
}
