import React, { useState, useEffect } from 'react';
import styles from './BreathingExercise.module.css';

const BreathingExercise = () => {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, hold
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, label: 'Breathe In', color: '#66bb6a' },
    hold1: { duration: 4, label: 'Hold', color: '#42a5f5' },
    exhale: { duration: 4, label: 'Breathe Out', color: '#ab47bc' },
    hold2: { duration: 4, label: 'Hold', color: '#42a5f5' },
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Move to next phase
            setPhase((currentPhase) => {
              const phaseOrder = ['inhale', 'hold1', 'exhale', 'hold2'];
              const currentIndex = phaseOrder.indexOf(currentPhase);
              const nextIndex = (currentIndex + 1) % phaseOrder.length;
              if (nextIndex === 0) {
                setCycle(c => c + 1);
              }
              return phaseOrder[nextIndex];
            });
            return phases[phase].duration;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(phases[phase].duration);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const startExercise = () => {
    setIsActive(true);
    setCycle(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
  };

  const currentPhaseData = phases[phase];

  return (
    <div className={styles.container}>
      <h2>Breathing Exercise</h2>
      <p className={styles.subtitle}>Find your center with guided breathing</p>

      <div className={styles.exerciseArea}>
        <div
          className={styles.breathingCircle}
          style={{
            backgroundColor: currentPhaseData.color,
            transform: phase === 'inhale' ? 'scale(1.5)' : phase === 'exhale' ? 'scale(0.7)' : 'scale(1)',
          }}
        >
          <div className={styles.phaseText}>
            {currentPhaseData.label}
          </div>
          <div className={styles.timer}>
            {timeLeft}
          </div>
        </div>

        <div className={styles.instructions}>
          <p>Follow the circle's rhythm:</p>
          <ul>
            <li><strong>Inhale</strong> - Expand your belly with air</li>
            <li><strong>Hold</strong> - Keep the air in gently</li>
            <li><strong>Exhale</strong> - Release the air slowly</li>
            <li><strong>Hold</strong> - Wait before the next breath</li>
          </ul>
        </div>
      </div>

      <div className={styles.controls}>
        {!isActive ? (
          <button onClick={startExercise} className={styles.startBtn}>
            Start Breathing Exercise
          </button>
        ) : (
          <button onClick={stopExercise} className={styles.stopBtn}>
            Stop Exercise
          </button>
        )}
        {cycle > 0 && (
          <div className={styles.cycleCount}>
            Cycles completed: {cycle}
          </div>
        )}
      </div>

      <div className={styles.benefits}>
        <h3>Benefits of Deep Breathing</h3>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>🧠</span>
            <span>Reduces stress & anxiety</span>
          </div>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>❤️</span>
            <span>Lowers blood pressure</span>
          </div>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>😌</span>
            <span>Improves focus & clarity</span>
          </div>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>💤</span>
            <span>Better sleep quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;