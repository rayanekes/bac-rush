import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Pour l'effet dramatique, on fixe la cible à J+3 à partir de maintenant
  // Dans un cas réel, on utiliserait la date fixe du Bac.
  useEffect(() => {
    // Le Bac national marocain commence le 4 juin à 8h00.
    const targetDate = new Date('2026-06-04T08:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds }
  ];

  return (
    <div className="glass-panel countdown-widget">
      <h2>Temps Restant</h2>
      <div className="countdown-grid">
        {timeBlocks.map((block, index) => (
          <div key={index} className="time-block">
            <span className="time-value text-gradient">
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="time-label">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
