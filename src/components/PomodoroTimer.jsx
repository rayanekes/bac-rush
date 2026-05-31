import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Switch modes
      if (isBreak) {
        setTimeLeft(25 * 60); // Back to work
        setIsBreak(false);
      } else {
        setTimeLeft(5 * 60); // 5 min break
        setIsBreak(true);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="glass-panel pomodoro-widget">
      <h2>{isBreak ? 'Pause (5 min)' : 'Focus (25 min)'}</h2>
      
      <div className="timer-display">
        <div className="timer-circle" style={{ background: `conic-gradient(var(${isBreak ? '--accent-cyan' : '--accent-purple'}) ${progress}%, transparent 0)` }}>
          <div className="timer-inner">
            <span className="time-big">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="btn-primary" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="btn-outline" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
