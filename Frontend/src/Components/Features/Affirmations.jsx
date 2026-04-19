import React, { useState, useEffect } from 'react';
import { affirmationAPI } from '../../services/api';
import styles from './Affirmations.module.css';

const Affirmations = () => {
  const [affirmation, setAffirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'stress-relief', label: 'Stress Relief' },
    { value: 'peace', label: 'Peace' },
    { value: 'self-love', label: 'Self Love' },
    { value: 'confidence', label: 'Confidence' },
  ];

  const fetchAffirmation = async () => {
    setLoading(true);
    try {
      const response = category === 'all'
        ? await affirmationAPI.getRandom()
        : await affirmationAPI.getByCategory(category);
      setAffirmation(response.data);
    } catch (error) {
      console.error('Error fetching affirmation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffirmation();
  }, [category]);

  return (
    <div className={styles.container}>
      <h2>Daily Affirmations</h2>
      <p className={styles.subtitle}>Positive words to nurture your mind and soul</p>

      <div className={styles.categorySelector}>
        <label>Choose a category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.affirmationCard}>
        {loading ? (
          <div className={styles.loading}>Loading affirmation...</div>
        ) : affirmation ? (
          <>
            <div className={styles.affirmationText}>
              "{affirmation.text}"
            </div>
            <div className={styles.categoryBadge}>
              {affirmation.category}
            </div>
          </>
        ) : (
          <div className={styles.error}>Unable to load affirmation</div>
        )}
      </div>

      <button onClick={fetchAffirmation} disabled={loading} className={styles.newBtn}>
        Get New Affirmation
      </button>

      <div className={styles.tips}>
        <h3>💡 Tips for Using Affirmations</h3>
        <ul>
          <li>Repeat your affirmation 3-5 times daily</li>
          <li>Say it with conviction and belief</li>
          <li>Use present tense ("I am" not "I will")</li>
          <li>Pair it with deep breathing for better effect</li>
        </ul>
      </div>
    </div>
  );
};

export default Affirmations;