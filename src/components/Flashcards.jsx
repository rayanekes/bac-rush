import { useState } from 'react';

const Flashcards = ({ flashcardsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcardsData || flashcardsData.length === 0) {
    return (
      <div className="glass-panel flashcard-widget">
        <h2>Révision Rapide</h2>
        <p>Aucune flashcard disponible.</p>
      </div>
    );
  }

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  // Safely get current card
  const safeIndex = currentIndex % flashcardsData.length;
  const currentCard = flashcardsData[safeIndex];

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
