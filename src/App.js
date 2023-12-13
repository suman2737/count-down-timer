import React, { useState, useEffect } from 'react';
import './App.css';

const Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          setIsPlaying(false);
          clearInterval(interval);
        } else {
          if (seconds === 0) {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          } else {
            setSeconds((prev) => prev - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, minutes, seconds]);

  const handlePlayBtn = () => {
    setIsPlaying(true);
  };

  const handleResetBtn = () => {
    setIsPlaying(false);
    setMinutes(0);
    setSeconds(0);
  };

  const handlePauseBtn = () => {
    setIsPlaying(false);
  };

  const handleInputChange = (event) => {
    const newMinutes = parseInt(event.target.value, 10);
    setMinutes(isNaN(newMinutes) ? 0 : newMinutes);
    setSeconds(0);
    setIsPlaying(false);
  };

  return (
    <div className = "container">
      <div>
        <label className='label'>
          Enter Minutes
          <input  className='input'type="number" value={minutes} onChange={handleInputChange} />
        </label>
      </div>
      <div className='timer'>
        <p>{`00:0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
      </div>
      <div>
        <button  className='btn' onClick={handlePlayBtn} disabled={isPlaying}>
          Play
        </button>
        <button className='btn' onClick={handleResetBtn}>Reset</button>
        <button className='btn' onClick={handlePauseBtn} disabled={!isPlaying}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default Countdown;

