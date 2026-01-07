# 📊 Guide Complet : Intégration Google Sheets

## ✅ Étape 1 : Créer une Google Sheets

1. Ouvrez [Google Sheets](https://sheets.google.com)
2. Cliquez sur **"+ Créer"** → **Feuille de calcul vierge**
3. Nommez-la : "Inscriptions Webinaire Canva Pro"

## ✅ Étape 2 : Récupérer l'ID de la feuille

Dans l'URL de votre Google Sheets, vous verrez quelque chose comme :
```
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
                                      ↑ ID de la feuille ↑
```

Copiez cette longue série d'alphanumériques (entre `/d/` et `/edit`)

## ✅ Étape 3 : Créer l'Apps Script

1. Dans votre Google Sheets, allez à **Extensions** → **Apps Script**
2. Une nouvelle fenêtre va s'ouvrir
3. Supprimez tout le code par défaut
4. Ouvrez le fichier `APPS_SCRIPT_CODE.gs` (dans ce dossier)
5. Copiez tout le code et collez-le dans l'éditeur Apps Script
6. **Remplacez** `'VOTRE_ID_FEUILLE'` par l'ID que vous avez copié
7. Cliquez sur **Enregistrer** (icône disquette)

## ✅ Étape 4 : Déployer l'Apps Script

1. Cliquez sur le bouton **"Exécuter"** pour initialiser la feuille
   - Autorisez l'accès si demandé
2. Cliquez sur **Déployer** (bouton bleu en haut)
3. Cliquez sur **"Nouveau déploiement"**
4. Sélectionnez **Type** → **API Web**
5. Remplissez :
   - **Exécuter en tant que** : Votre compte Google
   - **Qui a accès** : N'importe qui
6. Cliquez sur **Déployer**
7. **Copiez l'URL de déploiement** (elle ressemblera à) :
   ```
   https://script.google.com/macros/d/1ABC2DEF3GHI4JKL5/usercontent
   ```

## ✅ Étape 5 : Configurer le formulaire

1. Ouvrez le fichier `js/google-sheets.js`
2. Remplacez `'YOUR_DEPLOYMENT_URL'` par l'URL que vous avez copiée
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/d/1ABC2DEF3GHI4JKL5/usercontent';
   ```
3. Enregistrez le fichier

## ✅ Étape 6 : Modifier script.js

Trouvez la partie du code qui gère la soumission du formulaire et ajoutez ceci :

**Avant** :
```javascript
// Exemple du code existant
form.addEventListener('submit', (e) => {
    // validation...
    successMessage.style.display = 'block';
});
```

**Après** :
```javascript
form.addEventListener('submit', async (e) => {
    // validation...
    
    // Envoyer à Google Sheets
    const formData = window.googleSheets.collectData();
    await window.googleSheets.sendData(formData);
    
    successMessage.style.display = 'block';
});
```

## 🎉 C'est prêt !

À chaque fois qu'un utilisateur soumet le formulaire, ses données seront automatiquement ajoutées à votre Google Sheets.

### Vérifier les données

Retournez à votre Google Sheets, vous devriez voir une nouvelle ligne pour chaque inscription avec :
- Timestamp (date et heure)
- Nom complet
- Email
- Téléphone
- Et toutes les autres réponses

## 🔒 Sécurité

- Les données ne sont pas publiques (sauf si vous partagez le lien)
- Seule votre Google Sheets reçoit les données
- Pas de serveur externe nécessaire

## ❓ Troubleshooting

**Les données ne s'enregistrent pas ?**
- Vérifiez que l'URL de déploiement est correcte
- Vérifiez que l'ID de la feuille est correct dans Apps Script
- Ouvrez la console (F12) pour voir les erreurs

**Erreur CORS ?**
- C'est normal ! Google Sheets utilise `mode: 'no-cors'` pour contourner cela
- Les données s'enregistrent même si vous voyez une erreur

---

Besoin d'aide ? Consultez la [documentation Google Apps Script](https://developers.google.com/apps-script)
