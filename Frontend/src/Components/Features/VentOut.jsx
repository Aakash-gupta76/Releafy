import React, { useState, useRef } from 'react';
import styles from './VentOut.module.css';

const VentOut = () => {
  const [text, setText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(null); // 'burn' or 'tear'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const releaseAndAnimate = (type) => {
    if (!text.trim()) return;
    
    setAnimationType(type);
    setIsAnimating(true);
    
    // Reset after animation completes
    setTimeout(() => {
      setText('');
      setIsAnimating(false);
      setAnimationType(null);
      setShowConfirmation(true);
      
      // Hide confirmation after a few seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 4000);
    }, type === 'burn' ? 3000 : 1500); // match CSS animation durations
  };

  return (
    <div className={styles.container}>
      {/* SVG Filter for realistic burn effect */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <filter id="wavyBurn" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.02;0.03;0.02" dur="2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className={styles.headerBox}>
        <h2 className={styles.header}>Vent It Out</h2>
        <p className={styles.subtext}>
          Write down your anger, stress, or frustrations. 
          <br/>Nothing is saved. Release it here and let it go.
        </p>
      </div>

      <div className={`${styles.textAreaWrapper} ${isAnimating && animationType === 'burn' ? styles.burning : ''}`}>
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="I am feeling stressed because..."
          className={`${styles.textArea} ${
            isAnimating && animationType === 'tear' ? styles.tearing : ''
          }`}
          disabled={isAnimating}
        />
        {isAnimating && animationType === 'burn' && (
          <div className={styles.burnOverlay}>
            <div className={styles.burnHole}></div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button 
          className={styles.burnBtn}
          onClick={() => releaseAndAnimate('burn')}
          disabled={!text.trim() || isAnimating}
          title="Burn these thoughts"
        >
          🔥 Burn It
        </button>
        <button 
          className={styles.tearBtn}
          onClick={() => releaseAndAnimate('tear')}
          disabled={!text.trim() || isAnimating}
          title="Tear it up"
        >
          📄 Tear & Crumple
        </button>
      </div>

      {showConfirmation && (
        <div className={styles.message}>
          Your thoughts have been released into the void. Take a deep breath. 🌬️
        </div>
      )}
    </div>
  );
};

export default VentOut;
