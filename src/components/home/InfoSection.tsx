import { RESTAURANT } from "@/lib/constants";
import TandemBike from "@/components/ui/TandemBike";

export default function InfoSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-24">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-[0.26em] text-slate-light">Bistrot de village</p>
        <h2 className="font-heading text-3xl md:text-5xl text-bistro mt-2">Une halte au pied des sommets</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        <article className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-mountain/20 bg-chalk/95 shadow-lg shadow-bistro/[0.06]">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-mountain/10" />
          <h3 className="font-heading text-xl md:text-2xl text-bistro mb-5 md:mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-mountain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Horaires d&apos;ouverture
          </h3>
          <ul className="space-y-3">
            {RESTAURANT.hours.map((h) => (
              <li key={h.day} className={`flex justify-between items-center text-xs sm:text-sm ${h.hours === "Fermé" ? "text-bistro/35" : "text-bistro"}`}>
                <span className="font-medium">{h.day}</span>
                <span className={h.hours === "Fermé" ? "italic" : "text-slate-light"}>{h.hours}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-mountain/20 bg-gradient-to-br from-chalk to-cream shadow-lg shadow-bistro/[0.06]">
          <div className="absolute bottom-0 right-0 opacity-15">
            <TandemBike className="w-48 h-16 text-mountain" />
          </div>

          <h3 className="font-heading text-xl md:text-2xl text-bistro mb-5 md:mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-mountain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Nous trouver
          </h3>

          <p className="text-slate mb-2">{RESTAURANT.fullAddress}</p>
          <p className="text-sm text-slate-light mb-6">Au c&oelig;ur des Hautes-Alpes, entre lac et montagnes</p>

          <a href="https://www.google.com/maps/search/?api=1&query=Le+Tandem+Embrun" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mountain hover:text-mountain-dark font-medium">
            Ouvrir dans Google Maps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </article>
      </div>
    </section>
  );
}
