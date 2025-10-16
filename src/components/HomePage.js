import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const heroStyle = {
    background: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.8)), url('/images/im.jpg') center/cover no-repeat fixed`,
    minHeight: '100vh'
  };

  // Générer des particules dynamiquement
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div 
      key={`particle-${i}`}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 8 + 2}px`,
        height: `${Math.random() * 8 + 2}px`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${Math.random() * 10 + 10}s`
      }}
    />
  ));

  return (
    <div className="home-page">
      <section className="hero-section" style={heroStyle}>
        {/* Éléments flottants en arrière-plan */}
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          
          {/* Icônes produits flottantes */}
          <div className="floating-icon">📱</div>
          <div className="floating-icon">💻</div>
          <div className="floating-icon">🎧</div>
          <div className="floating-icon">⌚</div>
        </div>

        {/* Particules animées */}
        <div className="particles">
          {particles}
        </div>

        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Bienvenue chez <span className="highlight"> Gpower </span>
            </h1>
            <p className="hero-subtitle">
              Découvrez une sélection exclusive de produits de qualité. 
              Service client exceptionnel et livraison rapide.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="cta-button"
            >
              🛍️ Découvrez nos produits
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;