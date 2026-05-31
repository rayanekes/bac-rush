import { useState } from 'react';

const exercisesData = {
  si: [
    {
      id: 1,
      title: 'GRAFCET - Perceuse Automatique',
      question: 'Un système de perçage est contrôlé par un automate. Le cycle démarre si le bouton S1 est pressé et qu\'une pièce est présente (capteur p). Le moteur de rotation (KM1) démarre, puis le vérin de descente (V+) est activé jusqu\'au capteur bas (b). Ensuite, remontée (V-) jusqu\'au capteur haut (h). \n\nDessinez le GRAFCET d\'un point de vue partie opérative.',
      correction: 'Étape 0 : Initiale.\nTransition 0->1 : S1 . p\nÉtape 1 : Rotation broche (KM1) + Descente (V+)\nTransition 1->2 : b (Capteur bas)\nÉtape 2 : Rotation broche (KM1) + Remontée (V-)\nTransition 2->0 : h (Capteur haut)'
    },
    {
      id: 2,
      title: 'Moteur Asynchrone',
      question: 'Un moteur asynchrone triphasé porte les indications : 230V / 400V - 50Hz. Le réseau est de 400V entre phases. \n1. Quel couplage faut-il choisir ? \n2. Si la vitesse de synchronisme est de 1500 tr/min et le glissement de 4%, calculez la vitesse de rotation.',
      correction: '1. Le réseau fournit 400V, ce qui correspond à la tension maximale supportée (tension étoilée). Il faut donc un couplage Étoile (Y).\n2. Vitesse de rotation n = n_s * (1 - g) = 1500 * (1 - 0.04) = 1500 * 0.96 = 1440 tr/min.'
    }
  ],
  maths: [
    {
      id: 3,
      title: 'Nombres Complexes - Examen National',
      question: 'Soit l\'équation (E) : z² - 6z + 13 = 0. \nRésoudre dans C cette équation.',
      correction: 'Δ = b² - 4ac = (-6)² - 4(1)(13) = 36 - 52 = -16.\nΔ < 0, l\'équation admet deux solutions complexes conjuguées :\nz1 = (6 + i√16) / 2 = (6 + 4i) / 2 = 3 + 2i\nz2 = 3 - 2i'
    },
    {
      id: 4,
      title: 'Suites Numériques',
      question: 'Soit la suite (Un) définie par U0 = 2 et Un+1 = (1/3)Un + 4. \nMontrez par récurrence que pour tout n, Un < 6.',
      correction: 'Initialisation : U0 = 2 < 6. Vrai.\nHérédité : Supposons Un < 6. \nAlors (1/3)Un < 2 \n=> (1/3)Un + 4 < 2 + 4 \n=> Un+1 < 6. \nConclusion : Pour tout n, Un < 6.'
    }
  ],
  pc: [
    {
      id: 5,
      title: 'Circuit RLC Série',
      question: 'Un condensateur de capacité C = 10 μF est initialement chargé sous une tension U0 = 12V. Il se décharge dans une bobine d\'inductance L = 0.1 H et de résistance négligeable.\nCalculez la période propre T0 des oscillations.',
      correction: 'T0 = 2 * π * √(L * C)\nT0 = 2 * 3.14 * √(0.1 * 10 * 10^-6)\nT0 = 6.28 * √(10^-6) = 6.28 * 10^-3 s = 6.28 ms.'
    }
  ]
};

const Exercises = () => {
  const [activeSubject, setActiveSubject] = useState('si');
  const [showCorrection, setShowCorrection] = useState({});

  const toggleCorrection = (id) => {
    setShowCorrection(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="glass-panel exercises-widget">
      <h2>Entraînement Intensif (Annales STE)</h2>
      
      <div className="tabs">
        <button className={`tab-btn ${activeSubject === 'si' ? 'active' : ''}`} onClick={() => setActiveSubject('si')}>Sc. Ingénieur</button>
        <button className={`tab-btn ${activeSubject === 'maths' ? 'active' : ''}`} onClick={() => setActiveSubject('maths')}>Mathématiques</button>
        <button className={`tab-btn ${activeSubject === 'pc' ? 'active' : ''}`} onClick={() => setActiveSubject('pc')}>Physique-Chimie</button>
      </div>

      <div className="exercises-list">
        {exercisesData[activeSubject].map(ex => (
          <div key={ex.id} className="exercise-card">
            <h3>{ex.title}</h3>
            <p className="question">{ex.question}</p>
            
            <button className="btn-outline toggle-correction" onClick={() => toggleCorrection(ex.id)}>
              {showCorrection[ex.id] ? 'Cacher la correction' : 'Afficher la correction'}
            </button>
            
            {showCorrection[ex.id] && (
              <div className="correction-box">
                <h4>Correction :</h4>
                <p>{ex.correction}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
