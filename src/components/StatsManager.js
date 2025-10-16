import React, { useState, useEffect } from 'react';
import { getProductStats } from '../utils/tracking';
import { productService } from '../services/api';
import './StatsManager.css';

const StatsManager = () => {
  const [realStats, setRealStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        productService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      
      const stats = getProductStats();
      setRealStats(stats);
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'));
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const calculateMetrics = () => {
    if (!realStats || !products.length) return null;
    
    const totalRevenue = products.reduce((sum, p) => sum + parseFloat(p.prix || 0), 0);
    const avgPrice = totalRevenue / products.length;
    const conversionRate = (realStats.totalVues > 0 ? (realStats.produits.length / realStats.totalVues) * 100 : 0);
    
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalViews: realStats.totalVues,
      totalRevenue: totalRevenue.toFixed(2),
      avgPrice: avgPrice.toFixed(2),
      conversionRate: conversionRate.toFixed(1),
      topProduct: realStats.produits.length > 0 ? 
        realStats.produits.sort((a, b) => b.vues - a.vues)[0] : null
    };
  };

  const metrics = calculateMetrics();

  if (!metrics) {
    return (
      <div className="stats-manager-pro">
        <div className="loading-pro">
          <div className="loading-spinner"></div>
          <p>Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-manager-pro">
      {/* Header avec contrôles */}
      <div className="stats-header">
        <div className="header-info">
          <h2>📊 Analytics Dashboard</h2>
          <p className="last-update">Dernière mise à jour: {lastUpdate}</p>
        </div>
        
        <div className="header-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="24h">Dernières 24h</option>
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
          </select>
          
          <button className="refresh-btn" onClick={loadData}>
            🔄 Actualiser
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="metrics-grid">
        <div className="metric-card products">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>{metrics.totalProducts}</h3>
            <p>Produits en catalogue</p>
            <span className="metric-trend">+3 cette semaine</span>
          </div>
        </div>
        
        <div className="metric-card views">
          <div className="metric-icon">👁️</div>
          <div className="metric-content">
            <h3>{metrics.totalViews}</h3>
            <p>Vues totales</p>
            <span className="metric-trend">+{metrics.conversionRate}% taux</span>
          </div>
        </div>
        
        <div className="metric-card categories">
          <div className="metric-icon">🏷️</div>
          <div className="metric-content">
            <h3>{metrics.totalCategories}</h3>
            <p>Catégories actives</p>
            <span className="metric-trend">Prix moyen: {metrics.avgPrice}€</span>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="stats-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📈 Vue d'ensemble
        </button>
        <button 
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Produits
        </button>
        <button 
          className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          ⚡ Performance
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Graphique des vues par jour */}
            {Object.keys(realStats.vuesParJour).length > 0 && (
              <div className="chart-section">
                <h3>📅 Activité quotidienne</h3>
                <div className="daily-chart">
                  {Object.entries(realStats.vuesParJour)
                    .sort(([a], [b]) => new Date(a) - new Date(b))
                    .map(([date, vues]) => {
                      const maxVues = Math.max(...Object.values(realStats.vuesParJour));
                      const height = (vues / maxVues) * 100;
                      return (
                        <div key={date} className="chart-bar">
                          <div 
                            className="bar" 
                            style={{ height: `${height}%` }}
                            title={`${date}: ${vues} vues`}
                          ></div>
                          <span className="bar-label">{date.split('-')[2]}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            
            {/* Top produit */}
            {metrics.topProduct && (
              <div className="top-product-section">
                <h3>🏆 Produit star</h3>
                <div className="top-product-card">
                  <div className="product-badge">⭐ #1</div>
                  <div className="product-details">
                    <h4>{metrics.topProduct.nom}</h4>
                    <p>{metrics.topProduct.vues} vues • Dernière vue: {new Date(metrics.topProduct.derniereVue).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className="products-content">
            <h3>📦 Performance des produits</h3>
            {realStats.produits.length > 0 ? (
              <div className="products-performance">
                {realStats.produits
                  .sort((a, b) => b.vues - a.vues)
                  .map((produit, index) => (
                    <div key={produit.nom} className="product-performance-card">
                      <div className="rank-badge">#{index + 1}</div>
                      <div className="product-info">
                        <h4>{produit.nom}</h4>
                        <div className="performance-metrics">
                          <span className="views-count">{produit.vues} vues</span>
                          <span className="last-seen">Vu le {new Date(produit.derniereVue).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="performance-bar">
                          <div 
                            className="performance-fill" 
                            style={{ width: `${(produit.vues / realStats.totalVues) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="no-data-pro">
                <div className="no-data-icon">📊</div>
                <h4>Aucune donnée disponible</h4>
                <p>Les statistiques apparaîtront quand les visiteurs consulteront vos produits</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div className="performance-content">
            <h3>⚡ Métriques de performance</h3>
            <div className="performance-grid">
              <div className="perf-card">
                <h4>Taux de consultation</h4>
                <div className="perf-value">{metrics.conversionRate}%</div>
                <p>Produits vus / Total produits</p>
              </div>
              
              <div className="perf-card">
                <h4>Prix moyen</h4>
                <div className="perf-value">{metrics.avgPrice}€</div>
                <p>Moyenne de tous les produits</p>
              </div>
              
              <div className="perf-card">
                <h4>Engagement</h4>
                <div className="perf-value">{realStats.produits.length > 0 ? (realStats.totalVues / realStats.produits.length).toFixed(1) : '0'}</div>
                <p>Vues moyennes par produit</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsManager;