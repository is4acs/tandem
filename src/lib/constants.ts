export const RESTAURANT = {
  name: "Le Tandem",
  description: "Restaurant à Embrun",
  address: "Embrun, France",
  fullAddress: "Embrun, 05200, France",
  phone: "",
  email: "",

  hours: [
    { day: "Lundi", hours: "Fermé" },
    { day: "Mardi", hours: "12h00 - 14h00 / 19h00 - 22h00" },
    { day: "Mercredi", hours: "12h00 - 14h00 / 19h00 - 22h00" },
    { day: "Jeudi", hours: "12h00 - 14h00 / 19h00 - 22h00" },
    { day: "Vendredi", hours: "12h00 - 14h00 / 19h00 - 22h00" },
    { day: "Samedi", hours: "12h00 - 14h00 / 19h00 - 22h00" },
    { day: "Dimanche", hours: "Fermé" },
  ],

  social: {
    instagram: "https://www.instagram.com/letandem_embrun",
    facebook: "https://www.facebook.com/letandemembrun",
  },

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11490.86!2d6.495!3d44.5636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ccb1a00ebc3b2d%3A0x408ab2ae4bb20f0!2sEmbrun!5e0!3m2!1sfr!2sfr",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "La Carte" },
  { href: "/evenements", label: "Événements" },
  { href: "/livre-dor", label: "Livre d'Or" },
  { href: "/reseaux", label: "Réseaux" },
] as const;

export const MENU_CATEGORIES = [
  "Entrées",
  "Plats",
  "Desserts",
  "Boissons",
] as const;
