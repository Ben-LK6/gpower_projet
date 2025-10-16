import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onViewClick, categories }) => {
  // Trouver le nom de la catégorie
  const getCategoryName = () => {
    if (!product.category_id) return '';
    const category = categories?.find(cat => cat.id === product.category_id);
    return category?.nom || '';
  };

  const categoryName = getCategoryName();

  return (
    <div className="product-card">
      {/* Badge de catégorie */}
      {categoryName && (
        <div className="category-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <span>{categoryName}</span>
        </div>
      )}

      {/* Image du produit */}
      <div className="product-image-container">
        {product.image ? (
          <img
            src={product.image}
            alt={product.nom}
            className="product-image"
            loading="lazy"
          />
        ) : (
          <div className="product-image-placeholder">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
        <div className="image-overlay"></div>
      </div>

      {/* Informations du produit */}
      <div className="product-info">
        <h3 className="product-name">{product.nom}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <div className="price-container">
            <span className="price-label">Prix</span>
            <p className="product-price">
              {new Intl.NumberFormat('fr-FR').format(product.prix)}
              <span className="currency">FCFA</span>
            </p>
          </div>
          
          <button
            onClick={onViewClick}
            className="view-button"
            aria-label={`Voir ${product.nom}`}
          >
            <span className="button-text">Voir</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;