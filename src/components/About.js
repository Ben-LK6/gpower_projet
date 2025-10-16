import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Bienvenue chez Gpower</h1>
          <p className="hero-subtitle">
            Votre destination shopping pour des produits de qualité exceptionnelle
          </p>
        </div>
      </section>


      {/* Pourquoi nous choisir */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Pourquoi choisir Gpower ?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Service Personnalisé</h3>
              <p>Une équipe à votre écoute pour vous conseiller et vous accompagner dans vos achats.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Paiement Sécurisé</h3>
              <p>Vos transactions sont protégées. Achetez en toute confiance et sérénité.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3>Livraison Fiable</h3>
              <p>Expédition rapide et soignée. Recevez vos produits en parfait état.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
              </div>
              <h3>Satisfaction Garantie</h3>
              <p>Des produits testés et approuvés. Votre satisfaction est notre priorité absolue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="values-list">
            <div className="value-item">
              <span className="value-emoji">💎</span>
              <div className="value-content">
                <h3>Excellence</h3>
                <p>Nous visons l'excellence dans tout ce que nous faisons, de la sélection des produits au service client.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-emoji">🤝</span>
              <div className="value-content">
                <h3>Transparence</h3>
                <p>Une communication claire et honnête. Pas de surprises, juste de la confiance.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-emoji">🚀</span>
              <div className="value-content">
                <h3>Innovation</h3>
                <p>Nous recherchons constamment de nouveaux produits et améliorons notre service pour vous satisfaire.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-emoji">❤️</span>
              <div className="value-content">
                <h3>Passion</h3>
                <p>Nous aimons ce que nous faisons et mettons tout notre cœur à vous servir au mieux.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à découvrir nos produits ?</h2>
            <p>Rejoignez notre communauté de clients satisfaits au Bénin</p>
            <div className="cta-buttons">
              <a href="/products" className="cta-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span>Voir nos produits</span>
              </a>
              <a href="https://wa.me/+22940870199" className="cta-btn secondary" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contactez-nous</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;