import { useState } from 'react';
import './App.css';
import Countdown from './components/Countdown';
import PomodoroTimer from './components/PomodoroTimer';
import TaskManager from './components/TaskManager';
import Flashcards from './components/Flashcards';
import AiAssistant from './components/AiAssistant';
import ApiConfig from './components/ApiConfig';

function App() {
  const [apiKey, setApiKey] = useState('');
  
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Réviser le GRAFCET et les automatismes (SI)', completed: false, priority: 'high' },
    { id: 2, text: 'Refaire l\'examen national 2025 - Maths (Nombres complexes)', completed: false, priority: 'high' },
    { id: 3, text: 'Physique: Circuit RLC en régime forcé', completed: false, priority: 'high' },
    { id: 4, text: 'مراجعة مجزوءة الوضع البشري (الفلسفة)', completed: false, priority: 'medium' },
    { id: 5, text: 'Anglais: Linking words and Phrasal verbs', completed: true, priority: 'medium' }
  ]);

  const [flashcards, setFlashcards] = useState([
    { id: 1, subject: 'Sc. Ingénieur (SI)', question: 'Quelle est la différence entre un signal analogique et numérique ?', answer: 'Analogique: continu dans le temps. Numérique: discret (valeurs binaires 0 ou 1).' },
    { id: 2, subject: 'Mathématiques', question: 'Formule d\'intégration par parties ?', answer: '∫ u\'v dx = [uv] - ∫ uv\' dx' },
    { id: 3, subject: 'Physique-Chimie', question: 'Expression de la fréquence propre d\'un circuit LC idéal ?', answer: 'f0 = 1 / (2π√(LC))' },
    { id: 4, subject: 'الفلسفة', question: 'هل الشخص حر في أفعاله أم خاضع للضرورة؟ (مجزوءة الوضع البشري)', answer: 'حسب سارتر: الشخص حرية مطلقة. حسب سبينوزا: خاضع لحتميات (وهم الحرية).' },
    { id: 5, subject: 'Anglais', question: 'What is the opposite of "to take off" (plane)?', answer: 'To land' }
  ]);

  return (
    <div className="app-container">
      <div className="bg-glow cyan"></div>
      <div className="bg-glow purple"></div>

      <header className="header" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <ApiConfig apiKey={apiKey} setApiKey={setApiKey} />
        </div>
        <h1>Bac <span className="text-gradient">Rush</span></h1>
        <p className="subtitle">Mode Survie Activé - Spécialité STE !</p>
      </header>

      <main className="dashboard-grid">
        <section className="top-row">
          <Countdown />
          <PomodoroTimer />
        </section>
        
        <section className="middle-row">
           <AiAssistant 
              apiKey={apiKey} 
              tasks={tasks} setTasks={setTasks} 
              flashcards={flashcards} setFlashcards={setFlashcards} 
           />
        </section>

        <section className="bottom-row">
          <TaskManager tasks={tasks} setTasks={setTasks} />
          <Flashcards flashcardsData={flashcards} />
        </section>
      </main>
    </div>
  );
}

export default App;
