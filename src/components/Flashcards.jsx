import { useState } from 'react';

const flashcardsData = [
  { id: 1, subject: 'Sc. Ingénieur (SI)', question: 'Quelle est la différence entre un signal analogique et numérique ?', answer: 'Analogique: continu dans le temps. Numérique: discret (valeurs binaires 0 ou 1).' },
  { id: 2, subject: 'Mathématiques', question: 'Formule d\'intégration par parties ?', answer: '∫ u\'v dx = [uv] - ∫ uv\' dx' },
  { id: 3, subject: 'Physique-Chimie', question: 'Expression de la fréquence propre d\'un circuit LC idéal ?', answer: 'f0 = 1 / (2π√(LC))' },
  { id: 4, subject: 'الفلسفة', question: 'هل الشخص حر في أفعاله أم خاضع للضرورة؟ (مجزوءة الوضع البشري)', answer: 'حسب سارتر: الشخص حرية مطلقة. حسب سبينوزا: خاضع لحتميات (وهم الحرية).' },
  { id: 5, subject: 'Anglais', question: 'What is the opposite of "to take off" (plane)?', answer: 'To land' }
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const currentCard = flashcardsData[currentIndex];

  return (
    <div className="glass-panel flashcard-widget">
      <h2>Révision Rapide</h2>
      
      <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <span className="subject-badge">{currentCard.subject}</span>
            <p>{currentCard.question}</p>
            <small className="click-hint">Clique pour retourner</small>
          </div>
          <div className="flashcard-back">
            <span className="subject-badge">{currentCard.subject}</span>
            <p className="answer">{currentCard.answer}</p>
          </div>
        </div>
      </div>

      <div className="flashcard-controls">
        <button className="btn-outline" onClick={nextCard}>Suivant ➔</button>
      </div>
    </div>
  );
};

export default Flashcards;
