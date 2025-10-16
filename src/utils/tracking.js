// src/utils/tracking.js

// Tracking des vues de produits
export const trackProductView = (productId, productName) => {
  try {
    const trackingData = {
      productId,
      productName,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('fr-FR'),
      time: new Date().toLocaleTimeString('fr-FR'),
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer || 'direct',
      url: window.location.href
    };

    console.log('📊 Tracking product view:', productName, productId);

    // Sauvegarder dans localStorage
    const views = JSON.parse(localStorage.getItem('productViews') || '[]');
    views.push(trackingData);
    localStorage.setItem('productViews', JSON.stringify(views));

    // Envoyer au backend (optionnel)
    sendToBackend(trackingData);

  } catch (error) {
    console.error('❌ Erreur tracking:', error);
  }
};

// Envoyer les données au backend
const sendToBackend = async (data) => {
  try {
    // Tu peux créer une API pour sauvegarder en base
    // const response = await fetch('http://gpower.ct.ws/api/tracking.php', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  } catch (error) {
    console.log('Backend tracking non disponible');
  }
};

// Récupérer les statistiques
export const getProductStats = () => {
  try {
    const views = JSON.parse(localStorage.getItem('productViews') || '[]');
    
    // Calculer les stats
    const statsByProduct = {};
    const statsByDay = {};
    
    views.forEach(view => {
      // Par produit
      if (!statsByProduct[view.productId]) {
        statsByProduct[view.productId] = {
          nom: view.productName,
          vues: 0,
          derniereVue: view.timestamp
        };
      }
      statsByProduct[view.productId].vues++;
      statsByProduct[view.productId].derniereVue = view.timestamp;

      // Par jour
      if (!statsByDay[view.date]) {
        statsByDay[view.date] = 0;
      }
      statsByDay[view.date]++;
    });

    return {
      totalVues: views.length,
      produits: Object.values(statsByProduct),
      vuesParJour: statsByDay
    };
    
  } catch (error) {
    console.error('Erreur calcul stats:', error);
    return { totalVues: 0, produits: [], vuesParJour: {} };
  }
};