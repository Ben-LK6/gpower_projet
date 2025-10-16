// Service pour communiquer avec l'API PHP
const API_URL = 'https://gpower.ct.ws/api';

export const productService = {
  // Récupérer tous les produits
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/produits.php`);
      if (!response.ok) throw new Error('Erreur API');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return [];
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
    try {
      const response = await fetch(`${API_URL}/categories.php`);
      if (!response.ok) throw new Error('Erreur API');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return [];
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