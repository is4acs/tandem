-- ============================================
-- MISE À JOUR COMPLÈTE DE LA CARTE DU TANDEM
-- Basée sur la carte HD fournie
-- ============================================

-- 1. Supprimer tous les anciens plats
DELETE FROM menu_items;

-- ============================================
-- NOURRITURE
-- ============================================

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

-- SUGGESTIONS DU CHEF (15,50€)
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Suggestions du Chef', 'Rougail Saucisses aux Diots de Savoie', 'Spécialité maison revisitée', 15.50, false, null, 1),
  ('Suggestions du Chef', 'Tartiflette au Chonchon du Champsaur', 'Recette traditionnelle locale', 15.50, false, null, 2),
  ('Suggestions du Chef', 'Cuisse de Canard Rhum Vieux & Vanille', 'Cuisson lente, saveurs exotiques', 15.50, false, null, 3);

-- DESSERTS
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Desserts', 'Coulant au Chocolat cœur Caramel Beurre Salé', 'Chocolat fondant, cœur coulant', 9.00, false, null, 1),
  ('Desserts', 'Riz au Lait Vanillé au Chocolat Blanc', 'Onctueux, fait maison', 7.00, false, null, 2),
  ('Desserts', 'Meringues & Crème Douce', 'Légères et fondantes', 5.50, false, null, 3);

-- ============================================
-- BOISSONS CHAUDES
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Boissons Chaudes', 'Café', '', 1.50, false, null, 1),
  ('Boissons Chaudes', 'Café noisette', '', 1.80, false, null, 2),
  ('Boissons Chaudes', 'Café décaféiné', '', 1.50, false, null, 3),
  ('Boissons Chaudes', 'Café double', '', 2.50, false, null, 4),
  ('Boissons Chaudes', 'Cappuccino', '', 3.50, false, null, 5),
  ('Boissons Chaudes', 'Chocolat chaud', '', 4.00, false, null, 6),
  ('Boissons Chaudes', 'Thés du moment', '', 3.50, false, null, 7),
  ('Boissons Chaudes', 'Maté', '', 3.50, false, null, 8);

-- ============================================
-- BOISSONS FRAÎCHES
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Boissons Fraîches', 'Thé glacé maison', '', 4.00, false, null, 1),
  ('Boissons Fraîches', 'Smoothies', '', 5.50, false, null, 2),
  ('Boissons Fraîches', 'Milk shake aux fruits', '', 6.50, false, null, 3),
  ('Boissons Fraîches', 'Jus de fruits des Hautes-Alpes', 'Pomme, poire, pomme raisin, poire coing', 3.50, false, null, 4),
  ('Boissons Fraîches', 'Jus de fruits 20cl', 'Orange, tomate...', 3.00, false, null, 5),
  ('Boissons Fraîches', 'Sirops 25cl', '', 2.50, false, null, 6),
  ('Boissons Fraîches', 'Sodas Bouteille 33cl', 'Coca Cola, Orangina, Perrier, Limonade, Schweppes', 3.50, false, null, 7),
  ('Boissons Fraîches', 'Bissap', 'Infusion glacée de fleurs hibiscus', 5.00, false, null, 8),
  ('Boissons Fraîches', 'Eau pétillante San Pellegrino (1L)', '', 5.00, false, null, 9),
  ('Boissons Fraîches', 'Eau plate Evian (1L)', '', 5.00, false, null, 10);

-- ============================================
-- BIÈRES PRESSION
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Bières Pression', 'Bière légère Corsendonk pils / 5,2°', 'Belgique - Douce en bouche avec une amertume équilibrée', 0, false, null, 1),
  ('Bières Pression', 'Corsendonk pils 25cl', '', 3.00, false, null, 2),
  ('Bières Pression', 'Corsendonk pils 50cl', '', 5.50, false, null, 3),
  ('Bières Pression', 'Bière forte Queue de Charrue triple / 9°', 'Belgique - Arômes de malt caramélisé, saveurs épicées et fruitées', 0, false, null, 4),
  ('Bières Pression', 'Queue de Charrue 25cl', '', 4.50, false, null, 5),
  ('Bières Pression', 'Queue de Charrue 50cl', '', 8.50, false, null, 6),
  ('Bières Pression', 'Bière du moment Lupulus Hopéra / 6°', 'Belgique - Bière sèche à l''amertume prononcée mais contrôlée', 0, false, null, 7),
  ('Bières Pression', 'Lupulus Hopéra 25cl', '', 4.50, false, null, 8),
  ('Bières Pression', 'Lupulus Hopéra 50cl', '', 8.50, false, null, 9),
  ('Bières Pression', 'Panaché 25cl', '', 3.50, false, null, 10),
  ('Bières Pression', 'Panaché + sirop', '', 0.50, false, null, 11);

-- ============================================
-- BIÈRES BOUTEILLE (5,70€)
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Bières Bouteille', 'Bière Framboise, Boon', '5° / 25cl - Belgique - Aux arômes très fruités de framboise', 5.70, false, null, 1),
  ('Bières Bouteille', 'Bière IPA, Hip Hip Hip IPA', '5° / 33cl - Locale et Bio - Bière à l''amertume franche, saveur de résineux et d''épices', 5.70, false, null, 2),
  ('Bières Bouteille', 'Bière ambrée, La Walpé', 'Brasserie Walpine - 5,6° / 33cl - France (locale) et bio - Aux saveurs d''orge tendrement grillé et des biscuits de grand-mère', 5.70, false, null, 3),
  ('Bières Bouteille', 'Bière Brune, Barbe noire', '9° / 33cl - Belgique - C''est une bière de haute fermentation, à la robe noir foncé', 5.70, false, null, 4),
  ('Bières Bouteille', 'Bière du moment, La Blanche Neige', 'Brasserie Walpine - 5° / 33cl - Locale et Bio - Bière blanche, rafraîchissante, citronnée et herbacée', 5.70, false, null, 5),
  ('Bières Bouteille', 'Bière sans alcool, Brugze sport zot', '0,4° / 33cl - Belgique - Cette bière sans alcool révélera en bouche des notes épicées', 5.70, false, null, 6);

-- ============================================
-- BIÈRES DE PRESTIGE (à partager 35€)
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Bières de Prestige', 'Deus', '11,5° / 75cl - France - Produite en Belgique, elle est envoyée en Champagne pour une seconde fermentation', 35.00, false, null, 1),
  ('Bières de Prestige', 'Bush de Charmes', '10,5° / 75cl - Belgique - Cette Bush Triple a mûri dans un foudre de chêne ayant contenu du vin de Bourgogne blanc, le fameux Charmes Meursault !', 35.00, false, null, 2),
  ('Bières de Prestige', 'Bush de Nuit', '13° / 75cl - Belgique - Cette Bush de Noël a mûri dans des foudres de bois ayant contenu du Bourgogne de Nuit St-Georges', 35.00, false, null, 3);

-- ============================================
-- APÉRITIFS & DIGESTIFS
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Apéritifs & Digestifs', 'Martini 4cl', 'Rouge ou blanc', 4.50, false, null, 1),
  ('Apéritifs & Digestifs', 'Planteur 25cl (4,5cl de Rhum)', '', 8.00, false, null, 2),
  ('Apéritifs & Digestifs', 'Ti-punch 4cl', '', 6.50, false, null, 3),
  ('Apéritifs & Digestifs', 'Alcool fort 4cl', 'Get, vodka, whisky, rhum', 6.00, false, null, 4),
  ('Apéritifs & Digestifs', 'Alcool 4cl + soda 25cl', '', 7.00, false, null, 5),
  ('Apéritifs & Digestifs', 'Rhum ou Whisky supérieurs 4cl', '', 8.00, false, null, 6),
  ('Apéritifs & Digestifs', 'Rhum Clément XO 4cl', '', 12.00, false, null, 7),
  ('Apéritifs & Digestifs', 'Ricard 4cl', '', 3.00, false, null, 8),
  ('Apéritifs & Digestifs', 'Pastis des Alpes 2cl', '', 3.50, false, null, 9),
  ('Apéritifs & Digestifs', 'Shooter 2cl', '', 3.50, false, null, 10),
  ('Apéritifs & Digestifs', 'Alcools locaux et bio', 'Genépi, Limoncello, Gin, Pastis, Crème de fruits', 3.50, false, null, 11),
  ('Apéritifs & Digestifs', 'Alcools locaux d''exception 4cl', 'Isop, Genépi noir, eau de vie de Poire...', 8.00, false, null, 12);

-- ============================================
-- VINS ROUGES (Bouteille de 75cl)
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Vins Rouges', 'AOC Bordeaux, RectoVerso', 'Château Franc Baudron #fruité #souple #planche #vindescopains', 19.00, false, null, 1),
  ('Vins Rouges', 'IGP Hautes Alpes, M et M', '« Secret Partagé » Domaine Allemand #rondeur #épices #fromages', 23.00, false, null, 2),
  ('Vins Rouges', 'AOC Côtes-du-Rhône, Maison Delas', '#gourmand #épicé #charcuterie', 24.00, false, null, 3),
  ('Vins Rouges', 'VDF Languedoc Roussillon, Glougazel (Bio et Nature)', 'Domaine Regazel #ensoleillé #généreux #charcuterie', 24.00, false, null, 4),
  ('Vins Rouges', 'VDF, Avant-Garde (Vin Naturel Local)', 'Vignoble Terres du Gaugalin #rouge #velouté #fruitsnoirs #fromages', 25.00, false, null, 5),
  ('Vins Rouges', 'AOC Montagne Saint-Emilion, Château Carlina', 'Famille Paillé #souplesse #fruitsrouges #dessert', 27.00, false, null, 6),
  ('Vins Rouges', 'AOC Côtes de Provence, L''Instant (Bio)', 'Domaine Château Barbanau #structuré #roberubis #délicatesse', 29.00, false, null, 7),
  ('Vins Rouges', 'AOC IRANCY, Bourgogne, Plein Sud', 'Domaine Ferrari #ribs #charcuterie #fruitsrougesconfits', 29.00, false, null, 8),
  ('Vins Rouges', 'VDF, Embruns des Cimes (Vin Naturel Local)', 'Vignoble Les Raisins Suspendus #micro cuvée #32cépages #rare!', 34.00, false, null, 9),
  ('Vins Rouges', 'AOC Crozes-Hermitage, Drôme', 'Les Vins de Vienne #épicé #puissance #ribs', 36.00, false, null, 10),
  ('Vins Rouges', 'AOC Lalande de Pomerol, Bordeaux', 'Château La Fleur Richou, Famille Paillé #premium #fromage', 37.00, false, null, 11);

-- ============================================
-- VINS BLANCS (Bouteille de 75cl)
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Vins Blancs', 'VDF, Chardonnay, Domaine Patrice', 'Propriétaire à Chablis #fraîcheur #escargots #sec', 19.00, false, null, 1),
  ('Vins Blancs', 'IGP Côtes de Gascogne, Melody', 'Domaine François Lurton #fruité #agrumes #dessert', 23.00, false, null, 2),
  ('Vins Blancs', 'AOC Côtes du Rhône, Saint-Esprit', 'Maison Delas #fruitsjaunes #réconfortant', 25.00, false, null, 3),
  ('Vins Blancs', 'IGP Hautes-Alpes, Orcanette', 'Domaine Allemand #local #floral #sec', 26.00, false, null, 4),
  ('Vins Blancs', 'AOC Côtes de Provence, L''Instant (Bio)', 'Domaine Château Barbanau #rondeur #soleil #fromage', 30.00, false, null, 5),
  ('Vins Blancs', 'AOC Chablis, Chablis', 'Domaine Patrice #fraîcheur #huîtres #sec #evidence!', 36.00, false, null, 6),
  ('Vins Blancs', 'AOC Chablis, Chablis 1er cru', 'Domaine Patrice #finesse #poisson #fromages #premium', 44.00, false, null, 7);

-- ============================================
-- VINS ROSÉS (Bouteille de 75cl)
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Vins Rosés', 'AOC Bordeaux, La Fleur au Fusil', 'Famille Paillé #fleuri #apéro #fraîcheur #bellesurprise', 19.00, false, null, 1),
  ('Vins Rosés', 'AOC Côtes de Provence, La Girafe (Bio)', 'Domaine Château Barbanau #biodinamie #fruitsjaunes #fraîcheur', 24.00, false, null, 2),
  ('Vins Rosés', 'IGP Hautes Alpes, Goût des vacances', 'Domaine Allemand #fruitsrouges #apéro #gourmandise', 26.00, false, null, 3),
  ('Vins Rosés', 'AOC Côtes de Provence, L''Instant (Bio)', 'Domaine Château Barbanau #apérochic #poisson #ribs', 29.00, false, null, 4);

-- ============================================
-- CHAMPAGNE & CRÉMANT
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  ('Champagne & Crémant', 'AOC Champagne Trichet Premier Cru 75cl', '', 45.00, false, null, 1),
  ('Champagne & Crémant', 'AOC Crémant de Bourgogne Brut Pinot Noir 75cl', 'Caves de Bailly Lapierre', 25.00, false, null, 2);

-- ============================================
-- VINS AU VERRE (12cl)
-- ============================================
INSERT INTO menu_items (categorie, nom, description, prix, promo, prix_promo, ordre) VALUES
  -- ROUGE
  ('Vins au Verre', 'IGP Méditerranée, Les Iscles (Rouge)', '#épices #soleil', 4.00, false, null, 1),
  ('Vins au Verre', 'VDP Mont Caume, Mont Caume (Rouge Bio)', 'Domaine Lou Capellan #Méditerranée #soleil #équilibré', 5.00, false, null, 2),
  ('Vins au Verre', 'AOC Corbières, Bibazel (Rouge Bio)', 'Domaine Regazel #Pyrénéesorientales #terroir #fruitsnoirs', 6.00, false, null, 3),
  -- BLANC
  ('Vins au Verre', 'IGP Méditerranée, Les Iscles (Blanc)', '#fraîcheur #sec', 4.00, false, null, 4),
  ('Vins au Verre', 'VDP Mont Caume, Mont Caume (Blanc Bio)', 'Domaine Lou Capellan #Méditerranée #soleil #fraîcheur', 4.00, false, null, 5),
  ('Vins au Verre', 'VDF, Chardonnay, Domaine Patrice (Blanc)', '#fraîcheur #escargots #huîtres #Sec', 5.00, false, null, 6),
  -- ROSÉ
  ('Vins au Verre', 'VDP Mont Caume, Mont Caume (Rosé Bio)', 'Domaine Lou Capellan #Méditerranée #soleil #équilibré', 4.00, false, null, 7),
  ('Vins au Verre', 'AOC Côtes de Provence, La Girafe (Rosé Bio)', 'Domaine Château Barbanau #biodinamie #fruitsjaunes #apérochic', 7.00, false, null, 8);
