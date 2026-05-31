import { useState, useEffect } from 'react';

const Syllabus = () => {
  // Try to load from localStorage, otherwise use default
  const getInitialSyllabus = () => {
    const saved = localStorage.getItem('ste_syllabus_progress');
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 'math1', subject: 'Mathématiques', topic: 'Continuité et Dérivation', done: false },
      { id: 'math2', subject: 'Mathématiques', topic: 'Étude des Fonctions (ln, exp)', done: false },
      { id: 'math3', subject: 'Mathématiques', topic: 'Nombres Complexes', done: false },
      { id: 'math4', subject: 'Mathématiques', topic: 'Calcul Intégral', done: false },
      { id: 'math5', subject: 'Mathématiques', topic: 'Équations Différentielles', done: false },
      
      { id: 'si1', subject: 'Sc. Ingénieur', topic: 'Logique Combinatoire / Séquentielle', done: false },
      { id: 'si2', subject: 'Sc. Ingénieur', topic: 'Le GRAFCET', done: false },
      { id: 'si3', subject: 'Sc. Ingénieur', topic: 'Acquisition & Conversion (CAN/CNA)', done: false },
      { id: 'si4', subject: 'Sc. Ingénieur', topic: 'Réseaux Électriques & Triphasé', done: false },
      { id: 'si5', subject: 'Sc. Ingénieur', topic: 'Moteurs Asynchrones', done: false },

      { id: 'pc1', subject: 'Physique', topic: 'Ondes Mécaniques et Lumineuses', done: false },
      { id: 'pc2', subject: 'Physique', topic: 'Dipôles RC et RL', done: false },
      { id: 'pc3', subject: 'Physique', topic: 'Circuit RLC et Modulation', done: false },
      { id: 'pc4', subject: 'Physique', topic: 'Lois de Newton & Chute Verticale', done: false },
      { id: 'pc5', subject: 'Chimie', topic: 'Acides, Bases et Piles', done: false },
    ];
  };

  const [syllabus, setSyllabus] = useState(getInitialSyllabus);

  useEffect(() => {
    localStorage.setItem('ste_syllabus_progress', JSON.stringify(syllabus));
  }, [syllabus]);

  const toggleTopic = (id) => {
    setSyllabus(syllabus.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const progress = Math.round((syllabus.filter(i => i.done).length / syllabus.length) * 100);

  // Group by subject
  const subjects = [...new Set(syllabus.map(item => item.subject))];

  return (
    <div className="glass-panel syllabus-widget">
      <h2>Progression du Programme (STE)</h2>
      
      <div className="progress-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}% Complété</span>
      </div>

      <div className="syllabus-grid">
        {subjects.map(subject => (
          <div key={subject} className="syllabus-column">
            <h3>{subject}</h3>
            <ul className="syllabus-list">
              {syllabus.filter(item => item.subject === subject).map(item => (
                <li key={item.id} className={item.done ? 'done' : ''} onClick={() => toggleTopic(item.id)}>
                  <div className={`checkbox ${item.done ? 'checked' : ''}`}></div>
                  <span>{item.topic}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="strategy-box">
        <h3>💡 Stratégie Jour J</h3>
        <p><strong>Sciences de l'Ingénieur (4h) :</strong> Ne bloque pas sur une question. L'épreuve est longue. Lis bien le cahier de charges (GRAFCET) avant de commencer.</p>
      </div>
    </div>
  );
};

export default Syllabus;
