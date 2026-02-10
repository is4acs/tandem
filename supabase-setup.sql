CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categorie VARCHAR(50) NOT NULL,
  nom VARCHAR(200) NOT NULL,
  description TEXT,
  prix DECIMAL(6,2) NOT NULL,
  promo BOOLEAN DEFAULT false,
  prix_promo DECIMAL(6,2),
  ordre INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE evenements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  titre VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_menu_visible ON menu_items(visible, ordre);
CREATE INDEX idx_events_date ON evenements(visible, date);
CREATE INDEX idx_guestbook_approved ON guestbook(approved, created_at DESC);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE evenements ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public: lire menu visible"
  ON menu_items FOR SELECT
  USING (visible = true);

CREATE POLICY "Public: lire evenements visibles"
  ON evenements FOR SELECT
  USING (visible = true);

CREATE POLICY "Public: lire messages approuves"
  ON guestbook FOR SELECT
  USING (approved = true);

CREATE POLICY "Public: soumettre message"
  ON guestbook FOR INSERT
  WITH CHECK (
    approved = false
    AND char_length(nom) > 0
    AND char_length(nom) <= 100
    AND char_length(message) > 0
    AND char_length(message) <= 1000
  );

INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Entrées', 'Soupe a l''oignon', 'Gratinee au fromage', 8.50, false, null, 1),
  ('Entrées', 'Salade de chevre chaud', 'Mesclun, noix, miel', 10.00, false, null, 2),
  ('Plats', 'Steak frites', 'Piece de boeuf, frites maison', 18.00, true, 15.00, 1),
  ('Plats', 'Burger du Tandem', 'Pain brioche, cheddar, bacon', 16.50, false, null, 2),
  ('Plats', 'Plat du jour', 'Demandez au serveur !', 14.00, false, null, 3),
  ('Desserts', 'Tarte tatin', 'Pommes caramelisees, creme fraiche', 9.00, false, null, 1),
  ('Desserts', 'Mousse au chocolat', 'Chocolat noir 70%', 8.00, false, null, 2),
  ('Boissons', 'Vin rouge (verre)', 'Cotes du Rhone', 5.50, false, null, 1),
  ('Boissons', 'Biere pression', '25cl', 4.50, true, 3.50, 2),
  ('Boissons', 'Cafe', 'Expresso', 2.00, false, null, 3);

INSERT INTO evenements (date, titre, description) VALUES
  ('2026-03-15', 'Soiree Quiz', 'Venez tester vos connaissances en equipe ! Lots a gagner.'),
  ('2026-03-22', 'Soiree Jeux de Societe', 'Plus de 50 jeux disponibles. Venez entre amis !'),
  ('2026-04-05', 'Concert Live', 'Trio jazz en live a partir de 20h.');

INSERT INTO guestbook (nom, message, approved) VALUES
  ('Marie', 'Super ambiance et cuisine delicieuse ! On reviendra.', true),
  ('Thomas', 'La soiree jeux etait top, merci a toute l''equipe !', true);
