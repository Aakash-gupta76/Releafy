import React, { useState, useEffect } from 'react';
import styles from './FocusGame.module.css';

const FocusGame = () => {
  const [gameActive, setGameActive] = useState(false);
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [targetNumber, setTargetNumber] = useState(1);
  const [clickedNumbers, setClickedNumbers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  // Generate grid based on difficulty
  const generateGrid = (size) => {
    const totalNumbers = size * size;
    const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
  };

  // Initialize game
  const startGame = () => {
    const size = level === 1 ? 3 : level === 2 ? 4 : 5;
    setGridSize(size);
    setGrid(generateGrid(size));
    setTargetNumber(1);
    setClickedNumbers(0);
    setScore(0);
    setGameActive(true);
    setGameOver(false);
    setMessage('');
    setTimeLeft(60 - level * 10); // Decrease time with difficulty
  };

  // Timer effect
  useEffect(() => {
    if (!gameActive) return;

    if (timeLeft === 0) {
      endGame();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  // Handle number click
  const handleNumberClick = (number, index) => {
    if (!gameActive) return;

    if (number === targetNumber) {
      setClickedNumbers(clickedNumbers + 1);
      setScore(score + 10);
      setMessage('✓ Correct!');

      // Check if completed
      const totalNumbers = gridSize * gridSize;
      if (clickedNumbers + 1 === totalNumbers) {
        // Level completed
        if (level < 3) {
          setMessage('🎉 Well Done! Next Level...');
          setTimeout(() => {
            setLevel(level + 1);
            startGame();
          }, 2000);
        } else {
          endGame(true);
        }
        return;
      }

      setTargetNumber(targetNumber + 1);
      setTimeout(() => setMessage(''), 1000);
    } else {
      setMessage(`✗ Wrong! Tap ${targetNumber}`);
      setScore(Math.max(0, score - 5));
      setTimeout(() => setMessage(''), 1000);
    }
  };

  const endGame = (completed = false) => {
    setGameActive(false);
    setGameOver(true);
    if (completed) {
      setMessage('🏆 Amazing! You completed all levels!');
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setMessage('');
  };

  const getDifficultyColor = () => {
    if (level === 1) return '#4ECDC4';
    if (level === 2) return '#FFE66D';
    return '#FF6B6B';
  };

  return (
    <div className={styles.container}>
      <h2>🎯 Focus Game</h2>
      <p className={styles.subtitle}>
        Tap numbers in sequence (1, 2, 3...) to improve your attention and focus!
      </p>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.label}>Level:</span>
          <span className={styles.value} style={{ color: getDifficultyColor() }}>
            {level} {level === 1 ? '(Easy)' : level === 2 ? '(Medium)' : '(Hard)'}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Score:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Progress:</span>
          <span className={styles.value}>
            {clickedNumbers}/{gridSize * gridSize}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Time:</span>
          <span className={`${styles.value} ${timeLeft < 10 ? styles.warning : ''}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {!gameActive && !gameOver && (
        <div className={styles.startScreen}>
          <h3>Choose Your Level</h3>
          <div className={styles.levelSelector}>
            {[1, 2, 3].map((lv) => (
              <button
                key={lv}
                className={`${styles.levelBtn} ${level === lv ? styles.active : ''}`}
                onClick={() => setLevel(lv)}
              >
                <span className={styles.levelNum}>{lv}</span>
                <span className={styles.levelName}>
                  {lv === 1 ? '3×3' : lv === 2 ? '4×4' : '5×5'}
                </span>
              </button>
            ))}
          </div>
          <button className={styles.startBtn} onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {gameActive && (
        <>
          {message && <div className={styles.message}>{message}</div>}

          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {grid.map((number, index) => (
              <button
                key={index}
                className={`${styles.gridItem} ${
                  number < targetNumber ? styles.clicked : ''
                }`}
                onClick={() => handleNumberClick(number, index)}
                disabled={number < targetNumber}
              >
                {number}
              </button>
            ))}
          </div>

          <div className={styles.hint}>
            <p>👉 Tap the number: <strong style={{ fontSize: '1.3rem', color: '#FFE66D' }}>{targetNumber}</strong></p>
          </div>
        </>
      )}

      {gameOver && (
        <div className={styles.gameOverScreen}>
          <h3>Game Over!</h3>
          <p className={styles.finalScore}>Final Score: {score}</p>
          <p className={styles.levelReached}>Reached Level: {level}</p>
          <button className={styles.restartBtn} onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}

      <div className={styles.benefits}>
        <p>
          ✨ Benefits: Enhances concentration, improves cognitive processing speed,
          increases attention span, and trains rapid decision-making skills.
        </p>
      </div>
    </div>
  );
};

export default FocusGame;
