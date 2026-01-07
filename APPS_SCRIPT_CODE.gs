// Code à copier dans Google Apps Script
// Extensions > Apps Script > Remplacez tout par ce code

const SPREADSHEET_ID = 'VOTRE_ID_FEUILLE'; // Remplacez par votre ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Ajouter une ligne avec les données
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.usedCanva,
      data.canvaLevel,
      data.motivation,
      data.moneyAwareness,
      data.joinWhatsapp,
      data.contactIfIssue
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getData') {
      return getInscriptions();
    }
    
    return ContentService.createTextOutput(JSON.stringify({ error: 'Action non reconnue' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getInscriptions() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  const headers = data[0];
  const inscriptions = [];
  
  // Convertir les lignes en objets
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const inscription = {};
    
    headers.forEach((header, index) => {
      inscription[header] = row[index];
    });
    
    inscriptions.push(inscription);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ 
    success: true,
    data: inscriptions 
  }))
  .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour initialiser les en-têtes si nécessaire
function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'Nom complet',
      'Email',
      'Téléphone',
      'Déjà utilisé Canva',
      'Niveau Canva',
      'Motivation',
      'Conscience des opportunités',
      'Veut rejoindre WhatsApp',
      'Veut être contacté'
    ];
    
    sheet.appendRow(headers);
    
    // Formatage des en-têtes
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
  }
}
