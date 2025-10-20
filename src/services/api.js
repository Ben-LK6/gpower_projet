// Service pour communiquer avec l'API PHP
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Données mock pour la production
const MOCK_PRODUCTS = [
  {
    id: 1,
    nom: "Smartphone Galaxy",
    description: "Téléphone intelligent dernière génération",
    prix: "599.99",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
    category_id: 1,
    categorie_nom: "Électronique",
    categorie_couleur: "#FF6B6B"
  },
  {
    id: 2,
    nom: "T-shirt Premium",
    description: "T-shirt en coton bio de qualité",
    prix: "29.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    category_id: 2,
    categorie_nom: "Vêtements",
    categorie_couleur: "#4ECDC4"
  }
];

const MOCK_CATEGORIES = [
  { id: 1, nom: "Électronique", description: "Appareils électroniques", couleur: "#FF6B6B" },
  { id: 2, nom: "Vêtements", description: "Mode et accessoires", couleur: "#4ECDC4" }
];

const isProduction = process.env.REACT_APP_ENV === 'production';


export const productService = {
  // Récupérer tous les produits
  getProducts: async () => {
    if (isProduction) {
      return MOCK_PRODUCTS;
    }
    try {
      const response = await fetch(`${API_URL}/produits.php`);
      if (!response.ok) throw new Error('Erreur API');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return MOCK_PRODUCTS;
    }
  },

  // Récupérer un produit par ID
  getProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produits.php?id=${id}`);
      if (!response.ok) throw new Error('Erreur API');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return null;
    }
  },

  // Récupérer toutes les catégories
  getCategories: async () => {
    if (isProduction) {
      return MOCK_CATEGORIES;
    }
    try {
      const response = await fetch(`${API_URL}/categories.php`);
      if (!response.ok) throw new Error('Erreur API');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return MOCK_CATEGORIES;
    }
  },

  // Ajouter un produit
  addProduct: async (productData) => {
    try {
      const response = await fetch(`${API_URL}/produits.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return { error: 'Erreur de connexion' };
    }
  },

  // Modifier un produit
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/produits.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...productData }),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return { error: 'Erreur de connexion' };
    }
  },

  // Supprimer un produit
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produits.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return { error: 'Erreur de connexion' };
    }
  },

  // UPLOAD D'IMAGE - NOUVEAU !
  uploadImage: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/upload.php`, {
        method: 'POST',
        body: formData, // Pas de Content-Type pour FormData !
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur upload:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  },

  // Ajouter une catégorie
  addCategory: async (categoryData) => {
    try {
      const response = await fetch(`${API_URL}/categories.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return { error: 'Erreur de connexion' };
    }
  },

  // Modifier une catégorie
  updateCategory: async (id, categoryData) => {
    try {
      const response = await fetch(`${API_URL}/categories.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: id,
          ...categoryData 
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return { error: 'Erreur de connexion' };
    }
  },

  // Supprimer une catégorie
  deleteCategory: async (id) => {
    try {
      console.log('🟡 API - Suppression catégorie ID:', id);
      
      const response = await fetch(`${API_URL}/categories.php`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      });
      
      console.log('🟡 API - Response status:', response.status);
      const result = await response.json();
      console.log('🟡 API - Response data:', result);
      
      return result;
    } catch (error) {
      console.error('❌ API - Erreur:', error);
      return { error: 'Erreur de connexion' };
    }
  }
};
