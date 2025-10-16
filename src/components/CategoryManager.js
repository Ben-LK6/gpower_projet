import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import './CategoryManager.css';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(6);

  // Charger les catégories
  const loadCategories = async () => {
    try {
      console.log('🟡 Chargement des catégories...');
      const categoriesData = await productService.getCategories();
      console.log('🟡 Catégories reçues:', categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('❌ Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Ajouter une catégorie - VERSION RÉELLE
  const handleAddCategory = async (categoryData) => {
    try {
      console.log('🟡 Ajout catégorie:', categoryData);
      
      // APPEL API RÉEL
      const result = await productService.addCategory(categoryData);
      console.log('🟡 Résultat API:', result);
      
      if (result.success) {
        alert('Catégorie ajoutée avec succès !');
        loadCategories(); // Recharge la liste
        return true;
      } else {
        alert('Erreur: ' + (result.message || 'Échec de l\'ajout'));
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur ajout:', error);
      alert('Erreur de connexion au serveur');
      return false;
    }
  };

  // Modifier une catégorie
 // Modifier une catégorie - VERSION RÉELLE
const handleEditCategory = async (categoryId, categoryData) => {
  try {
    console.log('🟡 Modification catégorie:', categoryId, categoryData);
    
    // ✅ APPEL API RÉEL (supprimez l'alerte de simulation)
    const result = await productService.updateCategory(categoryId, categoryData);
    console.log('🟡 Résultat API modification:', result);
    
    if (result.success) {
      alert('Catégorie modifiée avec succès !');
      loadCategories(); // Recharge la liste
      return true;
    } else {
      alert('Erreur: ' + (result.message || 'Échec de la modification'));
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur modification:', error);
    alert('Erreur de connexion au serveur');
    return false;
  }
};

  // Supprimer une catégorie - VERSION RÉELLE
const handleDeleteCategory = async (categoryId, categoryName) => {
  console.log('🔴 1. handleDeleteCategory APPELLÉ - ID:', categoryId, 'Nom:', categoryName);
  
  if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ?`)) {
    console.log('🟡 2. Utilisateur a confirmé la suppression');
    
    try {
      console.log('🟡 3. Début appel API - ID:', categoryId);
      
      // APPEL API RÉEL
      const result = await productService.deleteCategory(categoryId);
      console.log('🟡 4. Résultat API:', result);
      
      if (result.success) {
        console.log('✅ 5. Suppression réussie');
        alert('Catégorie supprimée avec succès !');
        loadCategories(); // Recharge la liste
      } else {
        console.log('❌ 5. Erreur API:', result.message);
        alert('Erreur: ' + (result.message || 'Échec de la suppression'));
      }
    } catch (error) {
      console.error('❌ 6. Erreur attrapée:', error);
      alert('Erreur de connexion au serveur');
    }
  } else {
    console.log('🔴 2. Utilisateur a annulé');
  }
};

  const loadMore = () => {
    setDisplayedCount(prev => prev + 6);
  };

  const showLess = () => {
    setDisplayedCount(6);
  };

  const displayedCategories = categories.slice(0, displayedCount);
  const hasMore = displayedCount < categories.length;

  if (loading) {
    return <div className="loading">Chargement des catégories...</div>;
  }

  return (
  <div className="category-manager">
    <div className="manager-header">
      <h2>🏷️ Gestion des Catégories</h2>
      <button 
        onClick={() => setShowForm(true)}
        className="add-btn"
      >
        ＋ Ajouter une Catégorie
      </button>
    </div>

       <div className="categories-list">
        {displayedCategories.map(category => (
          <div key={category.id} className="category-item">
            <div 
              className="category-color-indicator"
              style={{ backgroundColor: category.couleur }}
            ></div>
            
            <div className="category-info">
              <h4>{category.nom}</h4>
              <p>{category.description}</p>
              <span className="category-color-code">{category.couleur}</span>
              {category.id <= 5 && (
                <span className="default-badge">Catégorie par défaut</span>
              )}
            </div>

            <div className="category-actions">
              <button 
                onClick={() => {
                  setEditingCategory(category);
                  setShowForm(true);
                }}
                className="btn-edit"
                title="Modifier cette catégorie"
              >
                ✏️ Modifier
              </button>

              <button 
                onClick={() => handleDeleteCategory(category.id, category.nom)}
                className="btn-delete"
                title="Supprimer cette catégorie"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {categories.length > 6 && (
        <div className="pagination-controls">
          {hasMore && (
            <button className="load-more-btn" onClick={loadMore}>
              Voir plus
            </button>
          )}
          {displayedCount > 6 && (
            <button className="show-less-btn" onClick={showLess}>
              Voir moins
            </button>
          )}
        </div>
      )}


      {/* 👇 FORMULAIRE CORRECTEMENT PLACÉ */}
      {(showForm || editingCategory) && (
        <CategoryForm
          category={editingCategory}
          onSave={(data) => {
            if (editingCategory) {
              return handleEditCategory(editingCategory.id, data);
            } else {
              return handleAddCategory(data);
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

// 👇 COMPOSANT FORMULAIRE À LA FIN
const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: category?.nom || '',
    description: category?.description || '',
    couleur: category?.couleur || '#25D366'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🎯 Formulaire soumis:', formData);
    
    const success = await onSave(formData);
    if (success) {
      onCancel();
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>{category ? '✏️ Modifier' : '➕ Ajouter'} une Catégorie</h3>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom de la catégorie"
            value={formData.nom}
            onChange={(e) => setFormData({...formData, nom: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="3"
          />
          
          <div className="color-input">
            <label>Couleur : </label>
            <input
              type="color"
              value={formData.couleur}
              onChange={(e) => setFormData({...formData, couleur: e.target.value})}
            />
            <span>{formData.couleur}</span>
          </div>

          <div className="form-buttons">
            <button type="submit">
              {category ? 'Modifier' : 'Enregistrer'}
            </button>
            <button type="button" onClick={onCancel}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryManager;