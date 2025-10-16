// Détection du pays et de la langue
export const detectUserLocation = async () => {
  try {
    // API gratuite pour la géolocalisation
    const response = await fetch('https://api.country.is/');
    const data = await response.json();
    
    const countryCode = data.country; // "FR", "US", "DE"...
    
    return {
      countryCode,
      country: getCountryName(countryCode),
      language: getLanguageFromCountry(countryCode),
      ip: data.ip
    };
    
  } catch (error) {
    console.log('🌍 API pays indisponible, utilisation de la langue navigateur');
    return getFallbackLocation();
  }
};

// Obtenir le nom du pays à partir du code
const getCountryName = (countryCode) => {
  const countries = {
    'FR': 'France',
    'BE': 'Belgique', 
    'CH': 'Suisse',
    'CA': 'Canada',
    'DE': 'Allemagne',
    'US': 'États-Unis',
    'GB': 'Royaume-Uni',
    'ES': 'Espagne',
    'IT': 'Italie'
  };
  return countries[countryCode] || 'Inconnu';
};

// Obtenir la langue par défaut du pays
const getLanguageFromCountry = (countryCode) => {
  const countryLanguages = {
    'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'CA': 'fr',
    'DE': 'de', 'AT': 'de',
    'US': 'en', 'GB': 'en', 'AU': 'en',
    'ES': 'es', 'IT': 'it', 'PT': 'pt'
  };
  return countryLanguages[countryCode] || 'en';
};

// Fallback basé sur la langue du navigateur
const getFallbackLocation = () => {
  const browserLang = navigator.language.split('-')[0]; // "fr" from "fr-FR"
  
  const langToCountry = {
    'fr': { countryCode: 'FR', country: 'France', language: 'fr' },
    'de': { countryCode: 'DE', country: 'Allemagne', language: 'de' },
    'en': { countryCode: 'US', country: 'États-Unis', language: 'en' },
    'es': { countryCode: 'ES', country: 'Espagne', language: 'es' },
    'it': { countryCode: 'IT', country: 'Italie', language: 'it' }
  };
  
  return langToCountry[browserLang] || { 
    countryCode: 'US', 
    country: 'International', 
    language: 'en' 
  };
};