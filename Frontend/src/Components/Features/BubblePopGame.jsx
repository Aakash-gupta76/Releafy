import React, { useState, useEffect, useRef } from 'react';
import styles from './BubblePopGame.module.css';

const BubblePopGame = () => {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newBubble = {
        id: bubbleIdRef.current++,
        left: Math.random() * 90,
        top: Math.random() * 80,
        size: Math.random() * 20 + 30,
        duration: Math.random() * 3 + 2,
        color: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'][
          Math.floor(Math.random() * 5)
        ],
      };

      setBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, newBubble.duration * 1000);
    }, 600);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleBubbleClick = (id) => {
    if (!gameActive) return;
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setBubbles([]);
    bubbleIdRef.current = 0;
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setTimeLeft(30);
    setBubbles([]);
    bubbleIdRef.current = 0;
  };

  return (
    <div className={styles.container}>
      <h2>🫧 Bubble Pop Game</h2>
      <p className={styles.subtitle}>Pop as many bubbles as you can within 30 seconds!</p>

      <div className={styles.gameStats}>
        <div className={styles.stat}>
          <span className={styles.label}>Score:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Time Left:</span>
          <span className={styles.value}>{timeLeft}s</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`${styles.gameArea} ${gameActive ? styles.active : ''}`}
      >
        {gameActive ? (
          <>
            {bubbles.map((bubble) => (
              <div
                key={bubble.id}
                className={styles.bubble}
                style={{
                  left: `${bubble.left}%`,
                  top: `${bubble.top}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  backgroundColor: bubble.color,
                  animation: `float ${bubble.duration}s linear forwards`,
                }}
                onClick={() => handleBubbleClick(bubble.id)}
              />
            ))}
          </>
        ) : (
          <div className={styles.placeholder}>
            {score > 0 ? (
              <>
                <p className={styles.gameOver}>Game Over!</p>
                <p className={styles.finalScore}>Your Score: {score} bubbles popped!</p>
              </>
            ) : (
              <p className={styles.startMessage}>Click "Start Game" to begin</p>
            )}
          </div>
        )}
      </div>

      <div className={styles.controls}>
        {!gameActive ? (
          <button className={styles.btn} onClick={startGame}>
            {score > 0 ? 'Play Again' : 'Start Game'}
          </button>
        ) : (
          <button className={`${styles.btn} ${styles.stopBtn}`} onClick={resetGame}>
            Stop Game
          </button>
        )}
      </div>

      <div className={styles.benefits}>
        <p>✨ Benefits: Improves reaction time, hand-eye coordination, and relieves stress through active play.</p>
      </div>
    </div>
  );
};

export default BubblePopGame;
