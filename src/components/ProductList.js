import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import SearchBar from './SearchBar';
import { trackProductView } from '../utils/tracking'; 
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(6);

  // Charger produits et catégories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

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
  }, [searchTerm, selectedCategory, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // NOUVEAU : Ouvrir la fiche produit AVEC TRACKING
  const openProductDetail = (product) => {
    // 🔥 TRACKING DE LA VUE
    trackProductView(product.id, product.nom);
    setSelectedProduct(product);
  };

  // NOUVEAU : Tracking des vues en liste aussi
  const handleProductView = (product) => {
    trackProductView(product.id, product.nom);
    openProductDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
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
    return <div className="loading">Chargement des produits...</div>;
  }

  return (
    <div className="product-list">
      <h1>🎁 Chez Gpower </h1>
      <p className="subtitle">Découvrez tous nos produits</p>
      
      <SearchBar 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h3>Aucun produit trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {displayedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewClick={() => handleProductView(product)}
              />
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

      {/* Fiche produit modale */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={closeProductDetail}
        />
      )}

    </div>
  );
};

export default ProductList;