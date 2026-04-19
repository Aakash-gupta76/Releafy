import React, { useState, useRef, useEffect } from 'react';
import styles from './AIChatModal.module.css';

export default function AIChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am your Releafy AI assistant. How can I help you find peace today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5004/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        // Handle no API key or other server error gracefully 
        if (data.error && data.error.includes("API Key")) {
          setMessages(prev => [...prev, { role: 'model', text: "⚠️ Note: The AI cannot connect because the GEMINI_API_KEY is not configured in the Backend's .env file. Please add your key to chat with me!" }]);
        } else {
          setMessages(prev => [...prev, { role: 'model', text: "Oops, something went wrong connecting to my brain. Please try again later." }]);
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please ensure the backend is running." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.chatContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.chatHeader}>
          <h3>AI Wellness Guide 🍃</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        
        <div className={styles.messagesList}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.modelWrapper}`}>
              <div className={msg.role === 'user' ? styles.userBubble : styles.modelBubble}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.modelWrapper}`}>
              <div className={styles.modelBubble}>
                <span className={styles.typingDot}></span>
                <span className={styles.typingDot}></span>
                <span className={styles.typingDot}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputArea} onSubmit={handleSend}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
            Send ✈️
          </button>
        </form>
      </div>
    </div>
  );
}
