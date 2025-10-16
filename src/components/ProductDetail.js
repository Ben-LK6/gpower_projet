import React, { useState } from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleWhatsApp = () => {
    const message = `Bonjour ! Je suis intéressé par : ${product.nom}`;
    const phoneNumber = '22940870199';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact depuis Gpower - ${product.nom}`;
    const body = `Nom: ${emailForm.name}\nEmail: ${emailForm.email}\n\nProduit: ${product.nom}\nPrix: ${new Intl.NumberFormat('fr-FR').format(product.prix)} FCFA\n\nMessage:\n${emailForm.message}`;
    window.location.href = `mailto:contact@gpower.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowEmailForm(false);
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-header">
          <button onClick={onClose} className="close-button" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="detail-content">
          {/* Image */}
          <div className="detail-image">
            {product.image ? (
              <img src={product.image} alt={product.nom} />
            ) : (
              <div className="image-placeholder">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="detail-info">
            <h2 className="product-title">{product.nom}</h2>
            
            <div className="price-section">
              <span className="price-label">Prix</span>
              <div className="price">
                {new Intl.NumberFormat('fr-FR').format(product.prix)}
                <span className="currency">FCFA</span>
              </div>
            </div>

            <div className="description-section">
              <p className="description">{product.description}</p>
            </div>

            <div className="contact-buttons">
              <button onClick={handleWhatsApp} className="btn btn-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </button>

              <button onClick={() => setShowEmailForm(true)} className="btn btn-email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Email</span>
              </button>

              <button onClick={() => setShowPhonePopup(true)} className="btn btn-call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Appeler</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Email Form */}
      {showEmailForm && (
        <div className="popup-overlay" onClick={() => setShowEmailForm(false)}>
          <div className="popup-content email-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Nous contacter</h3>
              <button onClick={() => setShowEmailForm(false)} className="popup-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="form-group">
                <label>Votre nom</label>
                <input
                  type="text"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                  required
                  placeholder="Entrez votre nom"
                />
              </div>
              <div className="form-group">
                <label>Votre email</label>
                <input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                  required
                  placeholder="votre@email.com"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                  required
                  placeholder="Votre message..."
                  rows="4"
                />
              </div>
              <button type="submit" className="submit-btn">Envoyer</button>
            </form>
          </div>
        </div>
      )}

      {/* Popup Phone */}
      {showPhonePopup && (
        <div className="popup-overlay" onClick={() => setShowPhonePopup(false)}>
          <div className="popup-content phone-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Contactez-nous</h3>
              <button onClick={() => setShowPhonePopup(false)} className="popup-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="phone-content">
              <div className="phone-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <p className="phone-text">Appelez-nous sur ce numéro</p>
              <a href="tel:+22940870199" className="phone-number">+22940870199</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;