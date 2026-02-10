-- ============================================
-- MISE À JOUR DE LA CARTE DU TANDEM
-- Supprimer les exemples et ajouter les vrais plats
-- ============================================

-- 1. Supprimer tous les anciens plats exemples
DELETE FROM menu_items;

-- 2. Insérer les vrais plats de l'ardoise

-- ENTRÉES
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Entrées', 'Tapas du Moment', 'Sélection du chef', 14.00, false, null, 1),
  ('Entrées', 'Tapas du Moment (Grande)', 'Sélection du chef - grande portion', 24.00, false, null, 2),
  ('Entrées', 'Escargots de Bourgogne (6 pièces)', 'Beurre persillé maison', 11.50, false, null, 3),
  ('Entrées', 'Escargots de Bourgogne (12 pièces)', 'Beurre persillé maison', 19.50, false, null, 4),
  ('Entrées', 'Os à Moëlle', 'Servi avec pain grillé', 7.00, false, null, 5),
  ('Entrées', 'Soupe de Langoustines', 'Velouté maison', 9.00, false, null, 6),
  ('Entrées', 'Foie Gras Maison', 'Fait maison, accompagnements du moment', 16.00, false, null, 7);

-- PLATS
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Plats', 'Tartare de Mahi-Mahi sauce Créole', 'Poisson frais, sauce créole maison', 19.50, false, null, 1),
  ('Plats', 'Croustillant de Poitrine de Porc', 'Poitrine croustillante, garniture du moment', 19.50, false, null, 2),
  ('Plats', 'Chili Végétarien', 'Fait maison, généreux en saveurs', 18.00, false, null, 3),
  ('Plats', 'Véritable Andouillette de Troyes sauce Chaource', 'AAAAA, sauce au fromage de Chaource', 18.00, false, null, 4);

-- SUGGESTIONS DU CHEF (15,50€ chacune)
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Suggestions du Chef', 'Rougail Saucisses aux Diots de Savoie', 'Spécialité maison revisitée', 15.50, false, null, 1),
  ('Suggestions du Chef', 'Tartiflette au Chonchon du Champsaur', 'Recette traditionnelle locale', 15.50, false, null, 2),
  ('Suggestions du Chef', 'Cuisse de Canard Rhum Vieux & Vanille', 'Cuisson lente, saveurs exotiques', 15.50, false, null, 3);

-- DESSERTS
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Desserts', 'Coulant au Chocolat cœur Caramel Beurre Salé', 'Chocolat fondant, cœur coulant', 9.00, false, null, 1),
  ('Desserts', 'Riz au Lait Vanillé au Chocolat Blanc', 'Onctueux, fait maison', 7.00, false, null, 2),
  ('Desserts', 'Meringues & Crème Douce', 'Légères et fondantes', 5.50, false, null, 3);

-- BOISSONS
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Boissons', 'Vin Chaud Maison', 'Recette maison aux épices', 3.50, false, null, 1);
