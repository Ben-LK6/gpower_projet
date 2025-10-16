import React, { useState, useEffect } from 'react';
import ProductManager from '../components/ProductManager';
import CategoryManager from '../components/CategoryManager';
import StatsManager from '../components/StatsManager';
import SettingsManager from '../components/SettingsManager';
import { productService } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalViews: 0,
    revenue: 0
  });

  // Gérer le redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifier au chargement

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Charger les statistiques
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, categories] = await Promise.all([
          productService.getProducts(),
          productService.getCategories()
        ]);
        
        const totalViews = localStorage.getItem('totalViews') || '0';
        const revenue = products.reduce((sum, product) => sum + parseFloat(product.prix || 0), 0);
        
        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalViews: parseInt(totalViews),
          revenue: revenue.toFixed(2)
        });
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      }
    };
    
    loadStats();
  }, [activeSection]);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', color: '#667eea' },
    { id: 'products', icon: '📦', label: 'Produits', color: '#25D366' },
    { id: 'categories', icon: '🏷️', label: 'Catégories', color: '#ff6b6b' },
    { id: 'stats', icon: '📈', label: 'Statistiques', color: '#ffa726' },
    { id: 'settings', icon: '⚙️', label: 'Paramètres', color: '#78909c' }
  ];

  const DashboardOverview = () => (
    <div className="dashboard-overview">
      <div className="welcome-section">
        <h1>👋 Bienvenue, Admin!</h1>
        <p>Voici un aperçu de votre boutique Gpower</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card products">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Produits</p>
          </div>
        </div>
        
        <div className="stat-card categories">
          <div className="stat-icon">🏷️</div>
          <div className="stat-info">
            <h3>{stats.totalCategories}</h3>
            <p>Catégories</p>
          </div>
        </div>
        
        <div className="stat-card views">
          <div className="stat-icon">👁️</div>
          <div className="stat-info">
            <h3>{stats.totalViews}</h3>
            <p>Vues totales</p>
          </div>
        </div>
        
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{stats.revenue}€</h3>
            <p>Valeur stock</p>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2>🚀 Actions rapides</h2>
        <div className="action-buttons">
          <button 
            className="action-btn add-product"
            onClick={() => setActiveSection('products')}
          >
            <span className="action-icon">➕</span>
            <span>Ajouter un produit</span>
          </button>
          
          <button 
            className="action-btn add-category"
            onClick={() => setActiveSection('categories')}
          >
            <span className="action-icon">🏷️</span>
            <span>Nouvelle catégorie</span>
          </button>
          
          <button 
            className="action-btn view-stats"
            onClick={() => setActiveSection('stats')}
          >
            <span className="action-icon">📈</span>
            <span>Voir statistiques</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard-pro">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon"></span>
            {!sidebarCollapsed && <span className="logo-text">Admin</span>}
          </div>
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              style={{'--item-color': item.color}}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button 
            className="logout-btn-pro"
            onClick={() => {
              localStorage.removeItem('isAdmin');
              window.location.href = '/';
            }}
          >
            <span className="logout-icon">🚪</span>
            {!sidebarCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          {isMobile && (
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              ☰
            </button>
          )}
          <h2 className="page-title">
            {menuItems.find(item => item.id === activeSection)?.icon} 
            {menuItems.find(item => item.id === activeSection)?.label}
          </h2>
        </div>
        
        <div className="content-body">
          {activeSection === 'dashboard' && <DashboardOverview />}
          {activeSection === 'products' && <div className="products-scope"><ProductManager /></div>}
          {activeSection === 'categories' && <div className="categories-scope"><CategoryManager /></div>}
          {activeSection === 'stats' && <div className="stats-scope"><StatsManager /></div>}
          {activeSection === 'settings' && <div className="settings-scope"><SettingsManager /></div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;