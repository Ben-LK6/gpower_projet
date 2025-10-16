import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ScrollHeader.css';

const ScrollHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(true);
        setIsMenuOpen(false); // Fermer le menu au scroll
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`scroll-header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="header-content">
    {/* NOUVEAU CODE - À METTRE */}
<div className="header-logo">
         <img 
             src="/images/monlogo.jpeg" 
          alt="Gpower" 
           className="logo-image"
          />
       <h1 className="logo-text">Gpower</h1>
         </div>
        {/* Menu Burger pour mobile */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link 
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Accueil
            </Link>
            <Link 
              to="/products"
              className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Produits
            </Link>
            <Link 
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              À Propos
            </Link>
          </div>

          {/* Bouton WhatsApp */}
          <a 
            href="https://wa.me/+22940870199" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-btn"
            onClick={closeMenu}
          >
            💬 WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
};

export default ScrollHeader;