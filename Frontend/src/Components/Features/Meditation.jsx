import React, { useState, useEffect } from 'react';
import styles from './Meditation.module.css';

const Meditation = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [selectedTime, setSelectedTime] = useState(300);
  const [phase, setPhase] = useState('preparation');

  const timeOptions = [
    { label: '2 min', value: 120 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setPhase('completed');
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setPhase('completed');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startMeditation = () => {
    setTimeLeft(selectedTime);
    setIsActive(true);
    setPhase('meditating');
  };

  const pauseMeditation = () => {
    setIsActive(false);
    setPhase('paused');
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeLeft(selectedTime);
    setPhase('preparation');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseMessage = () => {
    switch (phase) {
      case 'preparation':
        return 'Get comfortable and prepare to meditate';
      case 'meditating':
        return 'Focus on your breath and let thoughts pass by';
      case 'paused':
        return 'Meditation paused - resume when ready';
      case 'completed':
        return 'Well done! Meditation completed';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <h2>Mindfulness Meditation</h2>
      <p className={styles.subtitle}>Find peace through focused awareness</p>

      {phase === 'preparation' && (
        <div className={styles.setup}>
          <h3>Choose your meditation duration:</h3>
          <div className={styles.timeOptions}>
            {timeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedTime(option.value)}
                className={`${styles.timeBtn} ${selectedTime === option.value ? styles.selected : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.meditationArea}>
        <div className={styles.timerCircle}>
          <div className={styles.timerDisplay}>
            {formatTime(timeLeft)}
          </div>
          <div className={styles.phaseMessage}>
            {getPhaseMessage()}
          </div>
        </div>

        <div className={styles.breathingGuide}>
          {isActive && (
            <div className={styles.breathIndicator}>
              <div className={styles.breathText}>Breathe</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        {phase === 'preparation' && (
          <button onClick={startMeditation} className={styles.startBtn}>
            Begin Meditation
          </button>
        )}

        {phase === 'meditating' && (
          <>
            <button onClick={pauseMeditation} className={styles.pauseBtn}>
              Pause
            </button>
            <button onClick={resetMeditation} className={styles.resetBtn}>
              Reset
            </button>
          </>
        )}

        {phase === 'paused' && (
          <>
            <button onClick={() => setIsActive(true)} className={styles.resumeBtn}>
              Resume
            </button>
            <button onClick={resetMeditation} className={styles.resetBtn}>
              Reset
            </button>
          </>
        )}

        {phase === 'completed' && (
          <button onClick={resetMeditation} className={styles.resetBtn}>
            Meditate Again
          </button>
        )}
      </div>

      <div className={styles.tips}>
        <h3>Meditation Tips</h3>
        <ul>
          <li>Sit comfortably with your back straight</li>
          <li>Focus on your natural breathing</li>
          <li>Gently return your attention when your mind wanders</li>
          <li>Be kind to yourself - meditation is a practice</li>
        </ul>
      </div>
    </div>
  );
};

export default Meditation;