import React from 'react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {

  const whatsappNumber = '++229 40870199';
  
  // Message pré-rempli
  const message = "Bonjour ! Je suis intéressé par vos produits. Pouvez-vous m'aider ?";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Contactez-nous sur WhatsApp"
    >
      <span className="whatsapp-icon">💬</span>
      <span className="whatsapp-text">WhatsApp</span>
    </a>
  );
};

export default WhatsAppFloat;