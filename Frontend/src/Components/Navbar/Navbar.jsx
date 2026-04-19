import React, { useState, useEffect } from 'react'
import styles from '../Navbar/Navbar.module.css'
import { Link } from 'react-router-dom'
import AuthModal from '../Auth/AuthModal'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    handleAuthChange();
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
  };

  const links = ['Home', 'Features', 'About']

  return (
    <>
      <header className={styles.Navbar}>
        <div className={styles.brand}>
        <Link to='/' className={styles.logoContainer}>
          <svg className={styles.logoSvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C12 22 20 18 20 12C20 6 15 2 12 2C9 2 4 6 4 12C4 18 12 22 12 22Z" fill="url(#leafGradient)"/>
            <path d="M12 22V12" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
            <defs>
              <linearGradient id="leafGradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#63c7b4"/>
                <stop offset="1" stopColor="#328f7d"/>
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>Releafy</span>
        </Link>
      </div>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`${styles.navElement} ${menuOpen ? styles.active : ''}`}>
        <ul>
          {/* {links.map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))} */}

          <Link to='/' onClick={() => setMenuOpen(false)}><li>Home</li></Link>
          <Link to='/features' onClick={() => setMenuOpen(false)}><li>Features</li></Link>
           <Link to='/about' onClick={() => setMenuOpen(false)}><li>About</li></Link>
           <Link to="/ai-features" onClick={() => setMenuOpen(false)}><li>AI Features</li></Link>
        </ul>
        
        <div className={styles.mobileBtnContain}>
          {user ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
              <span style={{color: '#a0e8d6', fontWeight: '600', fontSize: '1rem'}}>Hi, {user.name.split(' ')[0]}</span>
              <button className={styles.Navbtn} onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
            </div>
          ) : (
            <button className={styles.Navbtn} onClick={() => { setIsAuthOpen(true); setMenuOpen(false); }}>Login</button>
          )}
        </div>
      </nav>

      <div className={styles.btnContain}>
        {user ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <span style={{color: '#a0e8d6', fontWeight: '600', fontSize: '0.95rem'}}>Hi, {user.name.split(' ')[0]}</span>
            <button className={styles.Navbtn} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className={styles.Navbtn} onClick={() => setIsAuthOpen(true)}>Login</button>
        )}
      </div>
    </header>

    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}

export default Navbar
