import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-wood text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, #D4A574 1px, transparent 1px), radial-gradient(circle at 75% 75%, #D4A574 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-gold mb-6">Le Tandem</h1>
        <p className="text-xl md:text-2xl text-cream/80 mb-4 font-light">Restaurant à Embrun</p>
        <div className="w-24 h-0.5 bg-terracotta mx-auto mb-8" />
        <p className="text-lg text-cream/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Bienvenue au Tandem ! Venez découvrir notre cuisine, nos soirées événementielles et notre ambiance chaleureuse au coeur d&apos;Embrun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/carte" className="inline-flex items-center justify-center px-8 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta-dark transition-colors text-lg">
            Découvrir la Carte
          </Link>
          <Link href="/evenements" className="inline-flex items-center justify-center px-8 py-3 border-2 border-gold text-gold font-medium rounded-lg hover:bg-gold/10 transition-colors text-lg">
            Nos Événements
          </Link>
        </div>
      </div>
    </section>
  );
}
