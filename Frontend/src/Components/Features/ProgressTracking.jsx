import React, { useState, useEffect } from 'react';
import { moodAPI } from '../../services/api';
import styles from './ProgressTracking.module.css';

const ProgressTracking = () => {
  const [moodData, setMoodData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [userId] = useState('demo-user'); // In production, get from auth

  useEffect(() => {
    fetchProgressData();
  }, [timeRange]);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const [moodsResponse, statsResponse] = await Promise.all([
        moodAPI.getMoods(userId),
        moodAPI.getMoodStats(userId)
      ]);

      setMoodData(moodsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDataByTimeRange = (data) => {
    const now = new Date();
    const filterDate = new Date();

    switch (timeRange) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return data;
    }

    return data.filter(item => new Date(item.date) >= filterDate);
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      'very-sad': '😢',
      'sad': '😕',
      'neutral': '😐',
      'happy': '😊',
      'very-happy': '😄'
    };
    return moodEmojis[mood] || '😐';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      'very-sad': '#f44336',
      'sad': '#ff9800',
      'neutral': '#9e9e9e',
      'happy': '#4caf50',
      'very-happy': '#2e7d32'
    };
    return moodColors[mood] || '#9e9e9e';
  };

  const getStressLevelColor = (level) => {
    if (level <= 3) return '#4caf50';
    if (level <= 6) return '#ff9800';
    return '#f44336';
  };

  const filteredData = filterDataByTimeRange(moodData);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className={styles.progress}>
      <div className={styles.header}>
        <h3>Your Wellness Journey</h3>
        <div className={styles.timeRange}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={styles.select}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {stats && (
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.totalEntries}</div>
            <div className={styles.statLabel}>Total Entries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.averageStress.toFixed(1)}</div>
            <div className={styles.statLabel}>Avg Stress Level</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {Object.entries(stats.moodDistribution).reduce((a, b) =>
                stats.moodDistribution[a] > stats.moodDistribution[b] ? a : b
              )}
            </div>
            <div className={styles.statLabel}>Most Common Mood</div>
          </div>
        </div>
      )}

      <div className={styles.charts}>
        <div className={styles.chart}>
          <h4>Mood Trends</h4>
          <div className={styles.moodChart}>
            {filteredData.slice(-10).map((entry, index) => (
              <div key={entry._id} className={styles.moodPoint}>
                <div
                  className={styles.moodDot}
                  style={{ backgroundColor: getMoodColor(entry.mood) }}
                  title={`${getMoodEmoji(entry.mood)} ${new Date(entry.date).toLocaleDateString()}`}
                >
                  {getMoodEmoji(entry.mood)}
                </div>
                {index < filteredData.slice(-10).length - 1 && (
                  <div className={styles.connector}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chart}>
          <h4>Stress Levels</h4>
          <div className={styles.stressChart}>
            {filteredData.slice(-10).map((entry) => (
              <div key={entry._id} className={styles.stressBar}>
                <div
                  className={styles.stressFill}
                  style={{
                    height: `${(entry.stressLevel / 10) * 100}%`,
                    backgroundColor: getStressLevelColor(entry.stressLevel)
                  }}
                  title={`Stress: ${entry.stressLevel}/10 on ${new Date(entry.date).toLocaleDateString()}`}
                ></div>
                <div className={styles.stressLabel}>
                  {new Date(entry.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.insights}>
        <h4>AI Insights</h4>
        <div className={styles.insight}>
          {stats && stats.averageStress > 6 && (
            <div className={styles.insightCard}>
              <span className={styles.insightIcon}>⚠️</span>
              <div>
                <h5>High Stress Alert</h5>
                <p>Your average stress level is elevated. Consider incorporating more relaxation techniques into your routine.</p>
              </div>
            </div>
          )}

          {stats && stats.averageStress <= 3 && (
            <div className={styles.insightCard}>
              <span className={styles.insightIcon}>🎉</span>
              <div>
                <h5>Great Progress!</h5>
                <p>Your stress levels are well-managed. Keep up the excellent work!</p>
              </div>
            </div>
          )}

          {filteredData.length === 0 && (
            <div className={styles.insightCard}>
              <span className={styles.insightIcon}>📝</span>
              <div>
                <h5>Start Tracking</h5>
                <p>Begin your wellness journey by logging your daily mood and stress levels.</p>
              </div>
            </div>
          )}

          {filteredData.length > 0 && (
            <div className={styles.insightCard}>
              <span className={styles.insightIcon}>📊</span>
              <div>
                <h5>Consistency Matters</h5>
                <p>Regular mood tracking helps identify patterns and improve your mental wellness over time.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.recentEntries}>
        <h4>Recent Entries</h4>
        <div className={styles.entriesList}>
          {filteredData.slice(0, 5).map((entry) => (
            <div key={entry._id} className={styles.entry}>
              <div className={styles.entryDate}>
                {new Date(entry.date).toLocaleDateString()}
              </div>
              <div className={styles.entryMood}>
                <span className={styles.moodEmoji}>{getMoodEmoji(entry.mood)}</span>
                <span className={styles.moodText}>{entry.mood.replace('-', ' ')}</span>
              </div>
              <div className={styles.entryStress}>
                Stress: {entry.stressLevel}/10
              </div>
              {entry.notes && (
                <div className={styles.entryNotes}>
                  "{entry.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;