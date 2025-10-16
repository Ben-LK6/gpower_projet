import React from 'react';


const Contact = () => {
  const phoneNumber = '0162976248'; // Remplacez par votre vrai numéro
  const email = 'cbloko3565@gmail.com'; // Remplacez par votre email

  const whatsappMessage = `Bonjour ! Je vous contacte depuis votre site Vos Achats.`;
  
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>📞 Contactez-Nous</h1>
        <p className="contact-subtitle">
          Une question ? Un produit spécifique en tête ? 
          Nous sommes là pour vous aider !
        </p>

        <div className="contact-methods">
          {/* WhatsApp */}
          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>Rapide et direct</p>
            <a 
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn whatsapp-btn"
            >
              Ouvrir WhatsApp
            </a>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>Pour les demandes détaillées</p>
            <a 
              href={`mailto:${email}?subject=Demande d'information`}
              className="contact-btn email-btn"
            >
              Envoyer un Email
            </a>
          </div>

          {/* Téléphone */}
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Téléphone</h3>
            <p>Du lundi au vendredi, 9h-18h</p>
            <a 
              href={`tel:${phoneNumber}`}
              className="contact-btn call-btn"
            >
              Appeler Maintenant
            </a>
          </div>
        </div>

        <div className="contact-info">
          <h3>📋 Informations de Contact</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>📞 Téléphone:</strong>
              <span> +229 40870199 </span>
            </div>
            <div className="info-item">
              <strong>📧 Email:</strong>
              <span>generatorpower60@gmail.com</span>
            </div>
            <div className="info-item">
              <strong>🕒 Horaires:</strong>
              <span>Lun-Ven: 9h-18h</span>
            </div>
            <div className="info-item">
              <strong>💬 WhatsApp:</strong>
              <span>24h/24 - 7j/7</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;