import React, { useState } from 'react';
import styles from './MusicCard.module.css';

export default function MusicCard() {
  const [musicLinks, setMusicLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestMusic = () => {
    setIsLoading(true);
    
    // Simulate AI music suggestion
    setTimeout(() => {
      const suggestions = [
        {
          title: 'Calm Piano Relaxation',
          url: 'https://www.youtube.com/results?search_query=calm+piano+relaxation'
        },
        {
          title: 'Nature Sounds: Forest Rain',
          url: 'https://www.youtube.com/results?search_query=nature+sounds+forest+rain'
        },
        {
          title: 'Ambient Sleep Music',
          url: 'https://www.youtube.com/results?search_query=ambient+sleep+music'
        }
      ];
      
      setMusicLinks(suggestions);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>🎵</span>
      </div>
      <h2 className={styles.title}>Music Suggestions</h2>
      <p className={styles.description}>
        Discover calming music and sounds curated by AI to enhance your relaxation and reduce stress.
      </p>

      <button
        onClick={suggestMusic}
        disabled={isLoading}
        className={`${styles.button} ${isLoading ? styles.loading : ''}`}
      >
        {isLoading ? 'Suggesting...' : 'Suggest Music'}
      </button>

      {musicLinks.length > 0 && (
        <div className={styles.musicList}>
          {musicLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.musicLink}
            >
              <span className={styles.linkIcon}>▶</span>
              <span className={styles.linkText}>{link.title}</span>
              <span className={styles.externalIcon}>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
