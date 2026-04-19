import React, { useState, useEffect } from 'react';
import { moodAPI } from '../../services/api';
import styles from './MoodTracker.module.css';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState('demo-user'); // In production, get from auth

  const moodOptions = [
    { value: 'very-sad', label: '😢 Very Sad', emoji: '😢' },
    { value: 'sad', label: '😕 Sad', emoji: '😕' },
    { value: 'neutral', label: '😐 Neutral', emoji: '😐' },
    { value: 'happy', label: '😊 Happy', emoji: '😊' },
    { value: 'very-happy', label: '😄 Very Happy', emoji: '😄' },
  ];

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await moodAPI.getMoods(userId);
      setMoods(response.data);
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return;

    setLoading(true);
    try {
      await moodAPI.createMood({
        userId,
        mood,
        stressLevel: parseInt(stressLevel),
        notes,
      });
      setMood('');
      setStressLevel(5);
      setNotes('');
      fetchMoods();
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Track Your Mood</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.moodSelector}>
          <label>How are you feeling?</label>
          <div className={styles.moodOptions}>
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${styles.moodButton} ${mood === option.value ? styles.selected : ''}`}
                onClick={() => setMood(option.value)}
              >
                <span className={styles.emoji}>{option.emoji}</span>
                <span className={styles.label}>{option.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stressLevel}>
          <label>Stress Level (1-10): {stressLevel}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value)}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className={styles.notes}>
          <label>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind?"
            rows="3"
          />
        </div>

        <button type="submit" disabled={!mood || loading} className={styles.submitBtn}>
          {loading ? 'Saving...' : 'Save Mood'}
        </button>
      </form>

      <div className={styles.history}>
        <h3>Recent Moods</h3>
        <div className={styles.moodList}>
          {moods.slice(0, 5).map((moodEntry) => (
            <div key={moodEntry._id} className={styles.moodEntry}>
              <div className={styles.moodInfo}>
                <span className={styles.emoji}>
                  {moodOptions.find(opt => opt.value === moodEntry.mood)?.emoji}
                </span>
                <span className={styles.date}>
                  {new Date(moodEntry.date).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.stressIndicator}>
                Stress: {moodEntry.stressLevel}/10
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;