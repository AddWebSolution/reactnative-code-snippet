// TimerContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';

const TimerContext = createContext();

export const TimerProvider = ({children}) => {
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(60);
  };

  const updateTimer = () => {
    if (timer > 0) {
      setTimer(prevTimer => prevTimer - 1);
    }
  };

  const resetTimer = () => {
    setTimer(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <TimerContext.Provider value={{timer, startTimer, updateTimer, resetTimer}}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
