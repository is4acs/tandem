import Link from "next/link";
import TandemBike from "@/components/ui/TandemBike";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bistro-dark via-bistro to-bistro-light text-chalk">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-mountain-light/35 to-transparent" />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 340" preserveAspectRatio="none" style={{ height: "48%" }}>
          <path fill="rgba(107,163,196,0.18)" d="M0,220 L120,168 L240,238 L360,152 L480,232 L600,140 L720,236 L840,150 L960,230 L1080,136 L1200,218 L1320,178 L1440,220 L1440,340 L0,340Z" />
          <path fill="rgba(107,163,196,0.12)" d="M0,248 L180,210 L360,260 L540,198 L720,252 L900,184 L1080,240 L1260,218 L1440,250 L1440,340 L0,340Z" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-28 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center min-h-[84vh]">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-mountain-light mb-5">Bistrot traditionnel · Embrun</p>
          <h1 className="font-heading text-5xl md:text-7xl leading-[0.95] text-chalk tracking-tight">Cuisine de montagne, esprit bistrot</h1>
          <p className="mt-6 text-lg text-chalk/80 max-w-xl leading-relaxed">
            Produits locaux, plats qui r&eacute;chauffent et tapas &agrave; partager: une table de village revisit&eacute;e avec vue sur les sommets.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/carte"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark shadow-lg shadow-accent/20"
            >
              Voir la carte
            </Link>
            <Link
              href="/evenements"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-mountain-light/55 text-mountain-light font-medium rounded-lg hover:bg-mountain-light/10"
            >
              Soir&eacute;es &amp; &eacute;v&eacute;nements
            </Link>
          </div>
        </div>

        <aside className="relative bg-chalk/[0.08] border border-mountain-light/25 rounded-2xl p-6 md:p-7 backdrop-blur-sm shadow-xl shadow-black/10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-mountain-light">Ardoise de la montagne</p>
          <h2 className="font-heading text-3xl text-chalk mt-2">L&apos;esprit Le Tandem</h2>

          <div className="mt-6 space-y-4 text-chalk/85">
            <div className="pb-4 border-b border-mountain-light/20">
              <p className="text-sm uppercase tracking-[0.2em] text-mountain-light mb-1">Tapas du moment</p>
              <p className="text-sm">Tapas &agrave; partager, inspir&eacute;es des saisons et des produits locaux.</p>
            </div>
            <div className="pb-4 border-b border-mountain-light/20">
              <p className="text-sm uppercase tracking-[0.2em] text-mountain-light mb-1">Ambiance</p>
              <p className="text-sm">Bois, pierres, lumi&egrave;res chaudes et service de bistrot traditionnel.</p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <TandemBike className="w-16 h-6 text-mountain-light" />
              <p className="text-sm text-chalk/75">Le tandem: un v&eacute;lo deux places, symbole du partage &agrave; table.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
