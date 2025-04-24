import { useEffect } from "react";

const useTimers = (playerTurn, timerRef, setTimers) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerTurn) {
        const newTimers = {
          ...timerRef.current,
          [playerTurn]: timerRef.current[playerTurn] - 1000,
        };
        setTimers(newTimers);
        timerRef.current = newTimers;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playerTurn, timerRef, setTimers]);
};

export default useTimers;