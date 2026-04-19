import React, { useState } from 'react';
import styles from './MoodCard.module.css';

export default function MoodCard() {
  const [moodInput, setMoodInput] = useState('');
  const [moodResult, setMoodResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const analyzeMood = () => {
    if (!moodInput.trim()) {
      setMoodResult('Please enter your feelings first.');
      return;
    }

    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const moods = [
        'I sense you might be feeling stressed or overwhelmed. Try taking deep breaths.',
        'Your mood suggests you could use some relaxation. Consider a meditation session.',
        'It sounds like you\'re looking for comfort. Let\'s find calming activities for you.',
        'I detect some anxiety in your words. Grounding techniques might help.'
      ];
      
      const randomResult = moods[Math.floor(Math.random() * moods.length)];
      setMoodResult(randomResult);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      analyzeMood();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>😊</span>
      </div>
      <h2 className={styles.title}>Mood Detection</h2>
      <p className={styles.description}>
        Share how you're feeling, and our AI will provide personalized insights and suggestions.
      </p>
      
      <div className={styles.moodSection}>
        <input
          type="text"
          placeholder="Tell me how you feel..."
          value={moodInput}
          onChange={(e) => setMoodInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.input}
        />
        
        <button
          onClick={analyzeMood}
          disabled={isLoading}
          className={`${styles.button} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Mood'}
        </button>

        {moodResult && (
          <div className={styles.result}>
            <p>{moodResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}
