import { RESTAURANT } from "@/lib/constants";

export default function InfoSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
          <h2 className="font-heading text-2xl text-wood mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Horaires d&apos;ouverture
          </h2>
          <ul className="space-y-3">
            {RESTAURANT.hours.map((h) => (
              <li key={h.day} className={`flex justify-between items-center text-sm ${h.hours === "Fermé" ? "text-wood/40" : "text-wood"}`}>
                <span className="font-medium">{h.day}</span>
                <span className={h.hours === "Fermé" ? "italic" : "text-wood-light"}>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
          <h2 className="font-heading text-2xl text-wood mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Nous trouver
          </h2>
          <p className="text-wood-light mb-4">{RESTAURANT.fullAddress}</p>
          <div className="mt-4">
            <a href="https://www.google.com/maps/search/?api=1&query=Le+Tandem+Embrun" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-medium transition-colors">
              Ouvrir dans Google Maps
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
