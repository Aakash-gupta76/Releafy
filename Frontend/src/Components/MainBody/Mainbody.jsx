import React, { useRef } from 'react'
import brainGif from '../../assets/brain.gif'
import backgroundVideo from '../../assets/background.mp4'
import styles from '../MainBody/Mainbody.module.css'
import sound from '../../assets/audio1.mp3'

const Mainbody = () => {
   const audioRef=useRef(null);
  
    // const audioRef=useRef(null);
    const PlayMusic=()=>{
      audioRef.current.play();
    }
    const pauseMusic=()=>{  
      audioRef.current.pause();
    }
  
  return (
    <div className={styles.main}>
      <video className={styles.bgVideo} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>Welcome To <span>Releafy🌿</span></h1>
        <audio  ref={audioRef} src={sound}/>

        <div className={styles.container}>
          <div className={styles.left}>
            <h2>Feeling <span>Stressed?</span> You're Not Alone.</h2>
            <p>Disconnect from stress, reconnect with yourself, and experience a calm, peaceful state of mind—anytime, anywhere.</p>
            <button onDoubleClick={pauseMusic} onClick={PlayMusic}>Get Started</button>
          </div>
          <div className={styles.right}>
            <img src={brainGif} alt="calming brain animation" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mainbody
