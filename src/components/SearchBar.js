import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onCategoryFilter, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Recherche en temps réel
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onCategoryFilter(categoryId);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    onSearch('');
    onCategoryFilter('');
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return '';
    return categories.find(c => c.id === selectedCategory)?.nom;
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-container">
        {/* Barre de recherche principale */}
        <div className="search-input-group">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Sélecteur de catégorie */}
        <div className="category-selector">
          <div className="category-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Badge des filtres actifs */}
      {(searchTerm || selectedCategory) && (
        <div className="active-filters">
          <div className="filter-tags">
            {searchTerm && (
              <div className="filter-tag">
                <span className="tag-label">Recherche:</span>
                <span className="tag-value">"{searchTerm}"</span>
                <button 
                  className="tag-remove" 
                  onClick={() => {
                    setSearchTerm('');
                    onSearch('');
                  }}
                >
                  ×
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="filter-tag">
                <span className="tag-label">Catégorie:</span>
                <span className="tag-value">{getSelectedCategoryName()}</span>
                <button 
                  className="tag-remove" 
                  onClick={() => {
                    setSelectedCategory('');
                    onCategoryFilter('');
                  }}
                >
                  ×
                </button>
              </div>
            )}
            {(searchTerm || selectedCategory) && (
              <button className="clear-all-filters" onClick={clearFilters}>
                Tout effacer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;