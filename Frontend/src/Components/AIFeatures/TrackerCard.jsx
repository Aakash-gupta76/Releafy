import React, { useState } from 'react';
import styles from './TrackerCard.module.css';

export default function TrackerCard() {
  const [progress, setProgress] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const trackProgress = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && progress.length === 0) {
      // Simulate loading initial progress data
      setTimeout(() => {
        setProgress([
          { date: 'Today', mood: '😌 Calm', improvement: '+12%' },
          { date: 'Yesterday', mood: '😊 Happy', improvement: '+8%' },
          { date: 'This Week', mood: '🧘 Peaceful', improvement: '+15%' },
          { date: 'This Month', mood: '💪 Strong', improvement: '+28%' }
        ]);
      }, 500);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>📊</span>
      </div>
      <h2 className={styles.title}>Progress Tracker</h2>
      <p className={styles.description}>
        Monitor your emotional well-being over time with AI-powered insights and trends.
      </p>

      <button
        onClick={trackProgress}
        className={`${styles.button} ${isExpanded ? styles.active : ''}`}
      >
        {isExpanded ? 'Hide Progress' : 'View Progress'}
      </button>

      {isExpanded && progress.length > 0 && (
        <div className={styles.progressContainer}>
          {progress.map((item, index) => (
            <div key={index} className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <span className={styles.date}>{item.date}</span>
                <span className={styles.improvement}>{item.improvement}</span>
              </div>
              <div className={styles.moodDisplay}>
                <span className={styles.moodEmoji}>{item.mood.split(' ')[0]}</span>
                <span className={styles.moodText}>{item.mood.split(' ').slice(1).join(' ')}</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${60 + index * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
