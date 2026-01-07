# 📊 Afficher les données dans le Dashboard

## Oui, vous verrez les inscriptions dans votre dashboard ! 

Voici comment configurer le dashboard pour afficher les données de Google Sheets :

## ✅ Étape 1 : Mettre à jour le code Apps Script

Le fichier `APPS_SCRIPT_CODE.gs` a été mis à jour pour pouvoir :
1. **Recevoir** les données du formulaire (POST)
2. **Envoyer** les données au dashboard (GET)

Assurez-vous que votre Apps Script contient les deux fonctions :
- `doPost(e)` - Pour les inscriptions
- `doGet(e)` - Pour récupérer les données du dashboard

## ✅ Étape 2 : Ajouter le script dans le dashboard

Ouvrez votre fichier `dashboard.html` et cherchez la balise `<script>` à la fin.

Remplacez le code existant par ceci :

```html
<script src="js/dashboard-sheets.js"></script>
<script>
    let currentPage = 1;
    let totalPages = 1;
    let allData = [];
    const itemsPerPage = 10;

    async function loadData() {
        try {
            // Récupérer les données depuis Google Sheets
            const data = await window.dashboardGoogleSheets.getData();
            
            // Transformer les données pour qu'elles correspondent au format attendu
            allData = data.map(row => ({
                full_name: row['Nom complet'] || '',
                email: row['Email'] || '',
                phone: row['Téléphone'] || '',
                canva_level: row['Niveau Canva'] || '',
                join_whatsapp: row['Veut rejoindre WhatsApp'] || '',
                contact_if_issue: row['Veut être contacté'] || '',
                registration_date: row['Timestamp'] || new Date().toISOString()
            }));

            updateStats();
            displayData();
        } catch (error) {
            console.error('Erreur:', error);
            document.getElementById('tableContent').innerHTML = '<p style="text-align: center; padding: 40px; color: #FF6B6B;">Erreur lors du chargement des données</p>';
        }
    }

    function updateStats() {
        const total = allData.length;
        const whatsapp = allData.filter(item => item.join_whatsapp === 'Oui').length;
        const beginners = allData.filter(item => item.canva_level === 'Débutant').length;
        const intermediates = allData.filter(item => item.canva_level === 'Intermédiaire').length;

        document.getElementById('totalRegistrations').textContent = total;
        document.getElementById('whatsappJoined').textContent = whatsapp;
        document.getElementById('beginnerCount').textContent = beginners;
        document.getElementById('intermediateCount').textContent = intermediates;
    }

    function displayData(filteredData = null) {
        const dataToDisplay = filteredData || allData;
        totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = dataToDisplay.slice(startIndex, endIndex);

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Niveau</th>
                        <th>WhatsApp</th>
                        <th>Contact secours</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
        `;

        if (pageData.length === 0) {
            tableHTML += '<tr><td colspan="7" style="text-align: center; padding: 40px;">Aucune inscription trouvée</td></tr>';
        } else {
            pageData.forEach(item => {
                const date = new Date(item.registration_date).toLocaleDateString('fr-FR');
                const levelClass = item.canva_level === 'Débutant' ? 'beginner' : item.canva_level === 'Intermédiaire' ? 'intermediate' : 'advanced';     

                tableHTML += `
                    <tr>
                        <td><strong>${item.full_name}</strong></td>
                        <td>${item.email}</td>
                        <td>${item.phone || '-'}</td>
                        <td><span class="badge ${levelClass}">${item.canva_level}</span></td>
                        <td><span class="badge ${item.join_whatsapp === 'Oui' ? 'yes' : 'no'}">${item.join_whatsapp}</span></td>
                        <td><span class="badge ${item.contact_if_issue === 'Oui' ? 'yes' : 'no'}">${item.contact_if_issue}</span></td>
                        <td>${date}</td>
                    </tr>
                `;
            });
        }

        tableHTML += '</tbody></table>';
        document.getElementById('tableContent').innerHTML = tableHTML;

        // Update pagination
        if (totalPages > 1) {
            document.getElementById('pagination').style.display = 'flex';
            document.getElementById('pageInfo').textContent = `Page ${currentPage} sur ${totalPages}`;
            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = currentPage === totalPages;
        } else {
            document.getElementById('pagination').style.display = 'none';
        }
    }

    function changePage(direction) {
        currentPage += direction;
        displayData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {
            currentPage = 1;
            displayData();
            return;
        }

        const filtered = allData.filter(item => {
            return item.full_name.toLowerCase().includes(searchTerm) ||
                   item.email.toLowerCase().includes(searchTerm) ||
                   item.canva_level.toLowerCase().includes(searchTerm);
        });

        currentPage = 1;
        displayData(filtered);
    });

    // Load data on page load
    document.addEventListener('DOMContentLoaded', loadData);

    // Rafraîchir les données toutes les 30 secondes
    setInterval(loadData, 30000);
</script>
```

## ✅ Étape 3 : Mettre à jour l'URL de déploiement

Dans le fichier `js/dashboard-sheets.js`, remplacez :
```javascript
const GOOGLE_SHEETS_API_URL = 'YOUR_DEPLOYMENT_URL';
```

Par votre URL de déploiement (la même que celle du formulaire).

## 🎉 Résultat

Votre dashboard va maintenant :
- ✅ Afficher toutes les inscriptions
- ✅ Rafraîchir automatiquement toutes les 30 secondes
- ✅ Afficher les statistiques (total, WhatsApp, niveaux)
- ✅ Permettre de chercher par nom/email
- ✅ Paginer les résultats

---

**Les données du formulaire et du dashboard sont maintenant synchronisées avec Google Sheets ! 🚀**
