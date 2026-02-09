export interface MenuItem {
  id: string;
  categorie: string;
  nom: string;
  description: string | null;
  prix: number;
  promo: boolean;
  prix_promo: number | null;
  ordre: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Evenement {
  id: string;
  date: string;
  titre: string;
  description: string | null;
  image_url: string | null;
  visible: boolean;
  created_at: string;
}

export interface GuestbookEntry {
  id: string;
  nom: string;
  message: string;
  approved: boolean;
  created_at: string;
}
