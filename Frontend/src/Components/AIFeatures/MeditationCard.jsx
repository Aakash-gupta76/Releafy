import React, { useState } from 'react';
import styles from './MeditationCard.module.css';

export default function MeditationCard() {
  const [meditationText, setMeditationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateMeditation = () => {
    setIsLoading(true);
    
    // Simulate AI meditation generation
    setTimeout(() => {
      const meditations = [
        'Close your eyes and take a deep breath. Imagine a peaceful blue ocean stretching before you. With each breath, feel the warmth of the sun and the gentle breeze. Let your worries drift away like clouds. You are safe, you are calm, you are at peace.',
        'Find a comfortable position. Begin by breathing in slowly for 4 counts, hold for 4, and exhale for 4. As you breathe, visualize a soft purple light filling your body. With each breath, this light becomes brighter, warmer, and more peaceful. You are releasing all tension.',
        'Imagine yourself in a serene garden filled with blooming flowers. The air is fresh and fragrant. Listen to the gentle sounds of birds and rustling leaves. Feel the soft grass beneath you. With each breath, you sink deeper into tranquility and calm.',
        'Sit comfortably and focus on your heartbeat. Feel the rhythm of life flowing through you. With each heartbeat, imagine positive energy filling your body. Release any negative thoughts on exhale. You are worthy, you are strong, you are peaceful.'
      ];
      
      const randomMeditation = meditations[Math.floor(Math.random() * meditations.length)];
      setMeditationText(randomMeditation);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>🧘</span>
      </div>
      <h2 className={styles.title}>Generate Meditation</h2>
      <p className={styles.description}>
        Get AI-generated personalized meditation guidance tailored to help you relax and find inner peace.
      </p>

      <button
        onClick={generateMeditation}
        disabled={isLoading}
        className={`${styles.button} ${isLoading ? styles.loading : ''}`}
      >
        {isLoading ? 'Generating...' : 'Generate Meditation'}
      </button>

      {meditationText && (
        <div className={styles.meditationBox}>
          <p className={styles.meditationText}>{meditationText}</p>
        </div>
      )}
    </div>
  );
}
