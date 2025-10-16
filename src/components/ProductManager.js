import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import './ProductManager.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Charger les produits et catégories
  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        productService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtrer les produits
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category_id == selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setDisplayedCount(6); // Reset pagination
  }, [searchTerm, selectedCategory, products]);

  // Formulaire de produit
  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      nom: product?.nom || '',
      description: product?.description || '',
      prix: product?.prix || '',
      image: product?.image || '',
      category_id: product?.category_id || 5
    });

    // UPLOAD D'IMAGE - DÉPLACÉ DANS LE COMPOSANT FORMULAIRE
    const handleImageUpload = async (file) => {
      try {
        console.log('📤 Upload du fichier:', file.name);
        
        const formDataObj = new FormData();
        formDataObj.append('image', file);
        
        const result = await productService.uploadImage(formDataObj);
        console.log('📤 Résultat upload:', result);
        
        if (result.success) {
          setFormData(prev => ({
            ...prev,
            image: result.imageUrl
          }));
        } else {
          alert('Erreur upload: ' + result.message);
        }
      } catch (error) {
        console.error('💥 Erreur upload:', error);
        alert('Erreur technique lors de l\'upload');
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('🎯 Formulaire soumis:', formData);
      
      try {
        if (!formData.nom || !formData.prix) {
          alert('Nom et prix sont obligatoires');
          return;
        }

        const result = product 
          ? await productService.updateProduct(product.id, formData)
          : await productService.addProduct(formData);

        console.log('🎯 Résultat API:', result);
        
        if (result.success) {
          await loadData();
          onSave();
        } else {
          alert('Erreur: ' + (result.error || result.message || 'Action échouée'));
        }
      } catch (error) {
        console.log('💥 Erreur complète:', error);
        alert('Erreur technique: ' + error.message);
      }
    };

    return (
      <div className="product-form-overlay-pro">
        <div className="product-form-pro">
          <div className="form-header">
            <h2>{product ? '✏️ Modifier le produit' : '➕ Nouveau produit'}</h2>
            <button className="close-btn" onClick={onCancel}>✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Nom du produit *</label>
                <input
                  type="text"
                  className="field-input"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Description</label>
                <textarea
                  className="field-textarea"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field half">
                <label className="field-label">Prix (€) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="field-input"
                  value={formData.prix}
                  onChange={(e) => setFormData({...formData, prix: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-field half">
                <label className="field-label">Catégorie</label>
                <select 
                  className="field-select"
                  value={formData.category_id} 
                  onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Image du produit</label>
                <div className="image-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input"
                    id="image-upload"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                  />
                  <label htmlFor="image-upload" className="file-label">
                    {formData.image ? (
                      <div className="image-preview-pro">
                        <img src={formData.image} alt="Aperçu" />
                        <div className="image-overlay">
                          <span>📷 Changer l'image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-icon">📷</div>
                        <div className="upload-text">
                          <strong>Cliquez pour ajouter une image</strong>
                          <small>PNG, JPG jusqu'à 10MB</small>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions-pro">
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Annuler
              </button>
              <button type="submit" className="btn-save">
                {product ? 'Mettre à jour' : 'Créer le produit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const result = await productService.deleteProduct(id);
      if (result.success) {
        await loadData();
      } else {
        alert('Erreur: ' + (result.error || 'Suppression échouée'));
      }
    }
  };

  const loadMore = () => {
    setDisplayedCount(prev => prev + 6);
  };

  const showLess = () => {
    setDisplayedCount(6);
  };

  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="product-manager">
      <div className="manager-header">
        <h3>Gestion des produits ({products.length})</h3>
        <button onClick={() => setShowForm(true)} className="add-btn">
          Ajouter un produit
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>
        
        {(searchTerm || selectedCategory) && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
          >
            ✕ Effacer
          </button>
        )}
      </div>

      {/* Résultats */}
      {(searchTerm || selectedCategory) && (
        <div className="search-results">
          <p>{filteredProducts.length} produit(s) trouvé(s)</p>
        </div>
      )}

      {filteredProducts.length === 0 && products.length > 0 ? (
        <div className="no-results">
          <h4>🔍 Aucun résultat</h4>
          <p>Aucun produit ne correspond à votre recherche</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h4>📦 Aucun produit</h4>
          <p>Commencez par ajouter votre premier produit</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {displayedProducts.map(product => (
              <div key={product.id} className="product-card-admin">
              <div className="product-image-container">
                {product.image ? (
                  <img src={product.image} alt={product.nom} />
                ) : (
                  <div className="no-image-placeholder">📷</div>
                )}
              </div>
              
              <div className="product-card-content">
                <h4 className="product-title">{product.nom}</h4>
                <p className="product-description">{product.description}</p>
                
                <div className="product-meta">
                  <span className="product-price">{product.prix} €</span>
                  {product.categorie_nom && (
                    <span 
                      className="category-badge"
                      style={{backgroundColor: product.categorie_couleur}}
                    >
                      {product.categorie_nom}
                    </span>
                  )}
                </div>
                
                <div className="product-actions">
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="action-btn edit-btn"
                  >
                    ✏️ Modifier
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="action-btn delete-btn"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length > 6 && (
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
        </>
      )}

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductManager;