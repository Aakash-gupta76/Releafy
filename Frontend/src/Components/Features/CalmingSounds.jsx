import React, { useState, useRef } from 'react';
import styles from './CalmingSounds.module.css';

const CalmingSounds = () => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());

  const sounds = [
    {
      id: 'rain',
      name: 'Rain Sounds',
      description: 'Peaceful rain and thunderstorm ambience',
      emoji: '🌧️',
      color: '#4a90e2',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2404/2404-preview.mp3'
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      description: 'Soothing waves and beach sounds',
      emoji: '🌊',
      color: '#3498db',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2403/2403-preview.mp3'
    },
    {
      id: 'forest',
      name: 'Forest',
      description: 'Birds chirping and rustling leaves',
      emoji: '🌲',
      color: '#27ae60',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2406/2406-preview.mp3'
    },
    {
      id: 'wind',
      name: 'Wind Chimes',
      description: 'Gentle wind and soft chimes',
      emoji: '🎐',
      color: '#9b59b6',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2407/2407-preview.mp3'
    },
    {
      id: 'meditation',
      name: 'Meditation',
      description: 'Zen music for deep meditation',
      emoji: '🧘',
      color: '#f39c12',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2394/2394-preview.mp3'
    },
    {
      id: 'fireplace',
      name: 'Fireplace',
      description: 'Crackling fire and warmth',
      emoji: '🔥',
      color: '#e74c3c',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2396/2396-preview.mp3'
    },
    {
      id: 'stream',
      name: 'Stream',
      description: 'Flowing water and natural sounds',
      emoji: '💧',
      color: '#16a085',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2405/2405-preview.mp3'
    },
    {
      id: 'night',
      name: 'Night Crickets',
      description: 'Gentle crickets and ambient night sounds',
      emoji: '🌙',
      color: '#2c3e50',
      duration: 600,
      url: 'https://assets.mixkit.co/active_storage/sfx/2395/2395-preview.mp3'
    }
  ];

  const playSound = (sound) => {
    const audio = audioRef.current;

    if (currentSound?.id === sound.id && isPlaying) {
      // Pause current sound
      audio.pause();
      setIsPlaying(false);
    } else {
      // Stop previous sound if playing
      if (isPlaying) {
        audio.pause();
      }

      // Load and play new sound
      audio.src = sound.url;
      audio.volume = volume;
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        // Loop the sound
        audio.currentTime = 0;
        audio.play();
      };

      audio.play()
        .then(() => {
          setCurrentSound(sound);
          setIsPlaying(true);
          setCurrentTime(0);
        })
        .catch(error => {
          console.error('Error playing sound:', error);
          // Show fallback message
          console.log('Note: Some sounds may not be available in offline mode');
        });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentSound(null);
      setCurrentTime(0);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Calming Sounds</h2>
      <p className={styles.subtitle}>Choose your perfect ambient soundtrack</p>

      {currentSound && (
        <div className={styles.nowPlaying}>
          <div className={styles.nowPlayingContent} style={{ backgroundColor: currentSound.color }}>
            <div className={styles.nowPlayingEmoji}>{currentSound.emoji}</div>
            <div className={styles.nowPlayingInfo}>
              <h3>{currentSound.name}</h3>
              <p>{currentSound.description}</p>
            </div>
          </div>

          <div className={styles.player}>
            <div className={styles.progressContainer}>
              <span className={styles.timeLabel}>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className={styles.progressBar}
              />
              <span className={styles.timeLabel}>{formatTime(duration)}</span>
            </div>

            <div className={styles.controls}>
              <button
                onClick={stopSound}
                className={styles.controlBtn}
                title="Stop"
              >
                ⏹️
              </button>
              <button
                onClick={() => playSound(currentSound)}
                className={styles.playBtn}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
            </div>

            <div className={styles.volumeControl}>
              <span className={styles.volumeIcon}>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
              <span className={styles.volumeLabel}>{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.soundsGrid}>
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className={`${styles.soundCard} ${currentSound?.id === sound.id ? styles.active : ''}`}
            onClick={() => playSound(sound)}
          >
            <div className={styles.soundEmoji}>{sound.emoji}</div>
            <h3>{sound.name}</h3>
            <p>{sound.description}</p>
            
            <div className={styles.soundStatus}>
              {currentSound?.id === sound.id && isPlaying && (
                <div className={styles.playingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                  Currently Playing
                </div>
              )}
              {currentSound?.id === sound.id && !isPlaying && (
                <div className={styles.pausedIndicator}>
                  ⏸️ Paused
                </div>
              )}
            </div>

            <button className={styles.playButtonCard}>
              {currentSound?.id === sound.id && isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.tips}>
        <h3>Tips for Best Experience</h3>
        <ul>
          <li>Combine sounds with meditation or breathing exercises</li>
          <li>Keep volume at a comfortable level (40-60% recommended)</li>
          <li>Use sounds as background during work or study</li>
          <li>Play sounds 30 minutes before sleep for better rest</li>
          <li>Mix sounds to create your perfect ambience</li>
        </ul>
      </div>
    </div>
  );
};

export default CalmingSounds;