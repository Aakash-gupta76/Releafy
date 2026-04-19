import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import MoodTracker from '../Components/Features/MoodTracker'
import Affirmations from '../Components/Features/Affirmations'
import BreathingExercise from '../Components/Features/BreathingExercise'
import Meditation from '../Components/Features/Meditation'
import CalmingSounds from '../Components/Features/CalmingSounds'
import StressAssessment from '../Components/Features/StressAssessment'
import ProgressTracking from '../Components/Features/ProgressTracking'
import BubblePopGame from '../Components/Features/BubblePopGame'
import ColouringGame from '../Components/Features/ColouringGame'
import FocusGame from '../Components/Features/FocusGame'
import VentOut from '../Components/Features/VentOut'
import backgroundVideo from '../assets/background.mp4'
import styles from './Features.module.css'
import Footer from '../Components/Footer/Footer'

const Features = () => {
  const navigate = useNavigate()
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 'mood',
      title: 'Mood Tracking',
      description: 'Track your emotional well-being and identify patterns in your stress levels.',
      icon: '📊',
      component: MoodTracker
    },
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Simple breathing techniques to calm your nervous system and reduce anxiety.',
      icon: '🌊',
      component: BreathingExercise
    },
    {
      id: 'affirmations',
      title: 'Daily Affirmations',
      description: 'Positive affirmations to boost your mood and reinforce positive thinking.',
      icon: '🌱',
      component: Affirmations
    },
    {
      id: 'meditation',
      title: 'Mindfulness Meditation',
      description: 'Guided meditation sessions to help you center your thoughts and find inner peace.',
      icon: '🧘‍♀️',
      component: Meditation
    },
    {
      id: 'sounds',
      title: 'Calming Sounds',
      description: 'Nature sounds and ambient music to create a serene atmosphere.',
      icon: '🎵',
      component: CalmingSounds
    },
    {
      id: 'bubblepop',
      title: 'Bubble Pop Game',
      description: 'Pop bubbles as quickly as you can to relieve stress and improve reaction time.',
      icon: '🫧',
      component: BubblePopGame
    },
    {
      id: 'colouring',
      title: 'Colouring Game',
      description: 'Express creativity through digital colouring. A relaxing artistic activity.',
      icon: '🎨',
      component: ColouringGame
    },
    {
      id: 'focus',
      title: 'Focus Game',
      description: 'Tap numbers in sequence to sharpen your concentration and attention skills.',
      icon: '🎯',
      component: FocusGame
    },

    {
      id: 'vent',
      title: 'Vent Out',
      description: 'Write down your stress, anger or frustration. Tear or burn it away! Nothing is saved.',
      icon: '😤',
      component: VentOut
    }
  ];

  const ActiveComponent = activeFeature ? features.find(f => f.id === activeFeature)?.component : null;

  return (
    <>
    
    <div className={styles.featuresContainer}>
      <video className={styles.bgVideo} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className={styles.overlay} />
      <Navbar/>
      <div className={styles.hero}>
        <h1 className={styles.title}>Our Features</h1>
        <p className={styles.subtitle}>Discover tools designed to bring peace to your mind</p>
      </div>

      {activeFeature ? (
        <div className={styles.featureDetail}>
          <button
            onClick={() => setActiveFeature(null)}
            className={styles.backBtn}
          >
            ← Back to Features
          </button>
          <div className={styles.activeFeature}>
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      ) : (
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button
                onClick={() => feature.redirect ? navigate(feature.redirect) : setActiveFeature(feature.id)}
                className={styles.tryBtn}
                disabled={!feature.component && !feature.redirect}
              >
                {feature.component || feature.redirect ? 'Try Now' : 'Coming Soon'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
    </>
  )
}

export default Features