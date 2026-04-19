import React, { useState } from 'react';
import styles from './StressAssessment.module.css';

const StressAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [stressLevel, setStressLevel] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const questions = [
    {
      id: 'sleep',
      question: 'How would you rate your sleep quality over the past week?',
      options: [
        { text: 'Excellent - I sleep soundly every night', value: 1 },
        { text: 'Good - I sleep well most nights', value: 2 },
        { text: 'Fair - I have some trouble sleeping', value: 3 },
        { text: 'Poor - I struggle to sleep most nights', value: 4 },
        { text: 'Very poor - I barely sleep at all', value: 5 }
      ]
    },
    {
      id: 'workload',
      question: 'How would you describe your current workload?',
      options: [
        { text: 'Very manageable', value: 1 },
        { text: 'Manageable with some effort', value: 2 },
        { text: 'Challenging but doable', value: 3 },
        { text: 'Overwhelming', value: 4 },
        { text: 'Completely unmanageable', value: 5 }
      ]
    },
    {
      id: 'relationships',
      question: 'How satisfied are you with your personal relationships?',
      options: [
        { text: 'Very satisfied', value: 1 },
        { text: 'Satisfied', value: 2 },
        { text: 'Neutral', value: 3 },
        { text: 'Dissatisfied', value: 4 },
        { text: 'Very dissatisfied', value: 5 }
      ]
    },
    {
      id: 'energy',
      question: 'How would you rate your energy levels during the day?',
      options: [
        { text: 'High energy throughout the day', value: 1 },
        { text: 'Good energy most of the time', value: 2 },
        { text: 'Moderate energy', value: 3 },
        { text: 'Low energy', value: 4 },
        { text: 'Very low energy, feeling exhausted', value: 5 }
      ]
    },
    {
      id: 'concentration',
      question: 'How well can you concentrate and focus?',
      options: [
        { text: 'Excellent concentration', value: 1 },
        { text: 'Good concentration', value: 2 },
        { text: 'Average concentration', value: 3 },
        { text: 'Poor concentration', value: 4 },
        { text: 'Very poor concentration, easily distracted', value: 5 }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / questions.length;
    setStressLevel(Math.round(averageScore));

    // Generate recommendations based on score
    const recs = [];
    if (averageScore >= 4) {
      recs.push({
        title: 'Immediate Stress Relief',
        description: 'Try our breathing exercises and meditation sessions right now.',
        action: 'breathing'
      });
      recs.push({
        title: 'Professional Support',
        description: 'Consider speaking with a mental health professional.',
        action: 'professional'
      });
    } else if (averageScore >= 3) {
      recs.push({
        title: 'Daily Mindfulness Practice',
        description: 'Incorporate short meditation sessions into your daily routine.',
        action: 'meditation'
      });
      recs.push({
        title: 'Lifestyle Adjustments',
        description: 'Focus on improving sleep quality and work-life balance.',
        action: 'lifestyle'
      });
    } else {
      recs.push({
        title: 'Maintain Wellness',
        description: 'Continue your current healthy practices and monitor your well-being.',
        action: 'maintain'
      });
    }

    setRecommendations(recs);
    setAssessmentComplete(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setAssessmentComplete(false);
    setStressLevel(0);
    setRecommendations([]);
  };

  const getStressLevelDescription = (level) => {
    if (level <= 2) return { text: 'Low Stress', color: '#4caf50', emoji: '😊' };
    if (level <= 3) return { text: 'Moderate Stress', color: '#ff9800', emoji: '😐' };
    return { text: 'High Stress', color: '#f44336', emoji: '😰' };
  };

  if (assessmentComplete) {
    const stressInfo = getStressLevelDescription(stressLevel);
    return (
      <div className={styles.results}>
        <h3>Assessment Complete</h3>
        <div className={styles.stressLevel}>
          <div className={styles.stressIndicator} style={{ backgroundColor: stressInfo.color }}>
            <span className={styles.emoji}>{stressInfo.emoji}</span>
            <span className={styles.levelText}>{stressInfo.text}</span>
            <span className={styles.score}>Score: {stressLevel}/5</span>
          </div>
        </div>

        <div className={styles.recommendations}>
          <h4>Personalized Recommendations</h4>
          {recommendations.map((rec, index) => (
            <div key={index} className={styles.recommendation}>
              <h5>{rec.title}</h5>
              <p>{rec.description}</p>
            </div>
          ))}
        </div>

        <button onClick={resetAssessment} className={styles.retakeBtn}>
          Retake Assessment
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.assessment}>
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
        <span className={styles.progressText}>
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className={styles.question}>
        <h3>{currentQ.question}</h3>
        <div className={styles.options}>
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className={`${styles.option} ${answers[currentQ.id] === option.value ? styles.selected : ''}`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={styles.navBtn}
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={!answers[currentQ.id]}
          className={styles.navBtn}
        >
          {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default StressAssessment;