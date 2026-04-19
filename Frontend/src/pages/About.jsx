import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import backgroundVideo from '../assets/background.mp4'
import styles from './About.module.css'
import Footer from '../Components/Footer/Footer'

const About = () => {
  return (
    <>
    <div className={styles.aboutContainer}>
      <video className={styles.bgVideo} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className={styles.overlay} />
      <Navbar/>
      <div className={styles.hero}>
        <h1 className={styles.title}>About Releafy</h1>
        <p className={styles.subtitle}>Your sanctuary for peace and tranquility</p>
      </div>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>In today's fast-paced world, stress and mental tension have become common challenges. At Releafy, we believe everyone deserves a moment of peace. Our platform provides tools and resources to help you unwind, relax, and rediscover your inner calm.</p>
        </section>
        <section className={styles.section}>
          <h2>What We Offer</h2>
          <ul className={styles.featuresList}>
            <li>Mindfulness exercises and meditation guides</li>
            <li>AI-powered stress assessment and personalized recommendations</li>
            <li>Calming visualizations and breathing techniques</li>
            <li>Community support and shared experiences</li>
            <li>Daily wellness tips and mood tracking</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Our Approach</h2>
          <p>We combine modern technology with ancient wisdom to create a holistic approach to stress relief. Our AI features analyze your patterns to provide tailored suggestions, while our calming interface ensures a serene user experience.</p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default About