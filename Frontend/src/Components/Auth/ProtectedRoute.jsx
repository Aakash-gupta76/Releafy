import React, { useState, useEffect } from 'react';
import styles from './AuthModal.module.css';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  // Checking user on mount
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    }
  }, [user]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (user) {
    return children;
  }

  return (
    <>
      {showPopup && (
        <div className={styles.overlay} style={{zIndex: 9999}}>
          <div className={styles.modal} style={{textAlign: 'center'}}>
            <h2 className={styles.title} style={{color: '#ff8c82', marginBottom: '10px'}}>Access Denied</h2>
            <p style={{marginBottom: '25px', color: '#cbd5e1', fontSize: '1.1rem'}}>
              Please login or register to access the pages or features.
            </p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button 
                className={styles.submitBtn} 
                style={{width: '100%'}}
                onClick={() => setRedirect(true)}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
