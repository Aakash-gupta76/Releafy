import React, { useState } from 'react';
import styles from './AIFeatures.module.css';
import backgroundVideo from '../assets/background.mp4';
import ChatCard from '../Components/AIFeatures/ChatCard';
import MoodCard from '../Components/AIFeatures/MoodCard';
import MeditationCard from '../Components/AIFeatures/MeditationCard';
import MusicCard from '../Components/AIFeatures/MusicCard';
import TrackerCard from '../Components/AIFeatures/TrackerCard';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import AIChatModal from '../Components/AIFeatures/AIChatModal';

export default function AIFeatures() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
    <div className={styles.aiContainer}>
      <video className={styles.bgVideo} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className={styles.overlay} />
      <Navbar />
      <div className={styles.container}>
       
       
      <div className={styles.header}>
        <h1 className={styles.heading}>AI Stress Relief Tools</h1>
        <p className={styles.subtitle}>
          Discover AI-powered features to manage your stress and improve your well-being
        </p>
      </div>
 
      <div className={styles.cardsGrid}>
        <ChatCard onClick={() => setIsChatOpen(true)} />
        <MoodCard />
        <MeditationCard />
        <MusicCard />
        <TrackerCard />
      </div>
      </div>
      
      {isChatOpen && <AIChatModal onClose={() => setIsChatOpen(false)} />}
    </div>
    <Footer />
    </>
  );
}
