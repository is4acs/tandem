import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-wood text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, #D4A574 1px, transparent 1px), radial-gradient(circle at 75% 75%, #D4A574 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-28 text-center">
        <Image
          src="/images/logo-tandem.png"
          alt="Le Tandem - Bistrot Resto"
          width={400}
          height={150}
          className="mx-auto mb-8 brightness-0 invert"
          priority
        />
        <p className="text-xl md:text-2xl text-cream/80 mb-4 font-light">Bistrot - Resto &agrave; Embrun</p>
        <div className="w-24 h-0.5 bg-terracotta mx-auto mb-8" />
        <p className="text-lg text-cream/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Bienvenue au Tandem ! Venez d&eacute;couvrir notre cuisine, nos soir&eacute;es &eacute;v&eacute;nementielles et notre ambiance chaleureuse au coeur d&apos;Embrun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/carte" className="inline-flex items-center justify-center px-8 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta-dark transition-colors text-lg">
            D&eacute;couvrir la Carte
          </Link>
          <Link href="/evenements" className="inline-flex items-center justify-center px-8 py-3 border-2 border-gold text-gold font-medium rounded-lg hover:bg-gold/10 transition-colors text-lg">
            Nos &Eacute;v&eacute;nements
          </Link>
        </div>
      </div>
    </section>
  );
}
