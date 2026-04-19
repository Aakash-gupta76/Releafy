import React, { useRef, useEffect, useState } from 'react';
import styles from './ColouringGame.module.css';

const ColouringGame = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(10);

  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#FFE66D',
    '#95E1D3',
    '#F38181',
    '#AA96DA',
    '#FCBAD3',
    '#A8D8EA',
    '#FFD3B6',
    '#FFAAA5',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw a simple pattern to color
      drawPattern(ctx);
    }
  }, []);

  const drawPattern = (ctx) => {
    ctx.strokeStyle = 'rgba(190, 242, 214, 0.3)';
    ctx.lineWidth = 2;

    // Draw some circles
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = 100 + i * 150;
        const y = 80 + j * 120;
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Draw inner pattern
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Draw some rectangles
    ctx.fillStyle = 'rgba(190, 242, 214, 0.15)';
    for (let i = 0; i < 5; i++) {
      const x = 30 + Math.random() * 500;
      const y = 300 + Math.random() * 80;
      const size = 30 + Math.random() * 50;
      ctx.fillRect(x, y, size, size);
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart')
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = selectedColor;
    ctx.fill();
    ctx.globalAlpha = 0.7;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPattern(ctx);
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={styles.container}>
      <h2>🎨 Colouring Game</h2>
      <p className={styles.subtitle}>
        Express yourself by colouring the canvas. A relaxing creative activity!
      </p>

      <div className={styles.controlPanel}>
        <div className={styles.colorSelector}>
          <label>Choose Color:</label>
          <div className={styles.colorGrid}>
            {colors.map((color) => (
              <button
                key={color}
                className={`${styles.colorBtn} ${
                  selectedColor === color ? styles.active : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className={styles.brushControl}>
          <label>Brush Size: {brushSize}px</label>
          <input
            type="range"
            min="5"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={380}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
      />

      <div className={styles.buttonGroup}>
        <button className={styles.btn} onClick={clearCanvas}>
          Clear Canvas
        </button>
        <button className={`${styles.btn} ${styles.downloadBtn}`} onClick={downloadArt}>
          Download Art
        </button>
      </div>

      <div className={styles.benefits}>
        <p>
          ✨ Benefits: Enhances creativity, reduces anxiety, promotes mindfulness, and provides a
          therapeutic outlet for self-expression.
        </p>
      </div>
    </div>
  );
};

export default ColouringGame;
