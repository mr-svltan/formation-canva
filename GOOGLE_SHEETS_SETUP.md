# Configuration Google Sheets pour les inscriptions

## Étape 1 : Créer une feuille Google Sheets

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Nommez-la "Inscriptions Webinaire Canva Pro"
4. Cliquez sur l'onglet "Partager" (en haut à droite)
5. Copiez l'URL de la feuille (exemple: `https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H/edit`)

## Étape 2 : Ajouter les colonnes

Dans la première ligne, ajoutez ces colonnes :
- A: Timestamp
- B: Nom complet
- C: Email
- D: Téléphone
- E: Déjà utilisé Canva
- F: Niveau Canva
- G: Motivation
- H: Conscience des opportunités monétaires
- I: Veut rejoindre WhatsApp
- J: Veut être contacté en cas de problème

## Étape 3 : Utiliser Apps Script (Gratuit et sécurisé)

1. Dans votre Google Sheets, cliquez sur **Extensions** → **Apps Script**
2. Remplacez le code par le code ci-dessous
3. Changez `SPREADSHEET_ID` par votre ID (voir URL)
4. Cliquez sur **Déployer** → **Nouveau déploiement** → **Type: API Web**
5. Copiez l'URL de déploiement

## Étape 4 : Mettre à jour votre HTML

Remplacez `YOUR_DEPLOYMENT_URL` dans le fichier `js/google-sheets.js` par l'URL du déploiement.

## Résultat

Toutes les inscriptions seront automatiquement sauvegardées dans Google Sheets ! ✨
