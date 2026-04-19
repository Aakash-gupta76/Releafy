import React from 'react';
import styles from './ChatCard.module.css';

export default function ChatCard({ onClick }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>💬</span>
      </div>
      <h2 className={styles.title}>AI Chat Support</h2>
      <p className={styles.description}>
        Get instant support and guidance from our AI companion. Talk about your feelings and concerns anytime.
      </p>
      <button className={styles.button} onClick={onClick}>
        Start Chat
      </button>
    </div>
  );
}
