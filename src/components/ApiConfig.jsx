import { useState, useEffect } from 'react';

const ApiConfig = ({ apiKey, setApiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setInputValue(savedKey);
    } else {
      setIsOpen(true);
    }
  }, [setApiKey]);

  const handleSave = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      localStorage.setItem('gemini_api_key', inputValue.trim());
      setApiKey(inputValue.trim());
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setInputValue('');
  };

  return (
    <>
      <button 
        className="btn-outline api-settings-btn" 
        onClick={() => setIsOpen(true)}
        title="Configurer l'API Gemini"
      >
        ⚙️ Clé API
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2>Configuration de l'IA (Gemini)</h2>
            <p style={{marginBottom: '15px', color: 'var(--text-secondary)'}}>
              Pour utiliser le Professeur IA, tu dois fournir ta propre clé API Google Gemini. 
              Elle sera sauvegardée <strong>uniquement sur ton navigateur (Local Storage)</strong> pour des raisons de sécurité.
            </p>
            <form onSubmit={handleSave}>
              <input
                type="password"
                className="glass-input"
                style={{width: '100%', marginBottom: '15px'}}
                placeholder="Colle ta clé API ici (AIzaSy...)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                {apiKey && (
                   <button type="button" className="btn-outline" onClick={() => setIsOpen(false)}>Annuler</button>
                )}
                {apiKey && (
                   <button type="button" className="btn-outline" onClick={handleClear} style={{borderColor: 'var(--accent-pink)', color: 'var(--accent-pink)'}}>Effacer</button>
                )}
                <button type="submit" className="btn-primary">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiConfig;
