import { useState, useEffect } from 'react';
import './App.css';
import Countdown from './components/Countdown';
import PomodoroTimer from './components/PomodoroTimer';
import TaskManager from './components/TaskManager';
import Flashcards from './components/Flashcards';

function App() {
  return (
    <div className="app-container">
      <div className="bg-glow cyan"></div>
      <div className="bg-glow purple"></div>

      <header className="header">
        <h1>Bac <span className="text-gradient">Rush</span></h1>
        <p className="subtitle">Mode Survie Activé - Spécialité STE !</p>
      </header>

      <main className="dashboard-grid">
        <section className="top-row">
          <Countdown />
          <PomodoroTimer />
        </section>
        
        <section className="bottom-row">
          <TaskManager />
          <Flashcards />
        </section>
      </main>
    </div>
  );
}

export default App;
