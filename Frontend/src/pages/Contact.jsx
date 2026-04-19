import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import styles from './Contact.module.css';
import Footer from '../Components/Footer/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'support@releafy.com' },
    { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '📍', label: 'Address', value: '123 Wellness Street' }
  ];

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </section>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Contact Methods */}
          <div className={styles.methods}>
            {contactMethods.map((method, idx) => (
              <div key={idx} className={styles.methodCard}>
                <div className={styles.methodIcon}>{method.icon}</div>
                <h3>{method.label}</h3>
                <p>{method.value}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className={styles.formWrapper}>
            <div className={styles.form}>
              <h2>Send us a Message</h2>

              {submitted ? (
                <div className={styles.success}>
                  <div className={styles.checkmark}>✓</div>
                  <h3>Thank You!</h3>
                  <p>We received your message and will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.group}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.group}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.group}>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={styles.textarea}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
