import React, { useState } from 'react';
import './SettingsManager.css';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    siteName: 'Mes Super Achats',
    contactEmail: 'contact@mesachats.com',
    phone: '+33 1 23 45 67 89'
  });

  return (
    <div className="settings-manager">
      <h2>⚙️ Paramètres du Site</h2>
      
      <div className="settings-form">
        <div className="setting-item">
          <label>Nom du site</label>
          <input 
            type="text" 
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
          />
        </div>
        
        <div className="setting-item">
          <label>Email de contact</label>
          <input 
            type="email" 
            value={settings.contactEmail}
            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
          />
        </div>
        
        <div className="setting-item">
          <label>Téléphone</label>
          <input 
            type="tel" 
            value={settings.phone}
            onChange={(e) => setSettings({...settings, phone: e.target.value})}
          />
        </div>
        
        <button className="save-btn">Enregistrer</button>
      </div>
    </div>
  );
};

export default SettingsManager;