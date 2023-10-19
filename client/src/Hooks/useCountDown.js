import { useEffect, useRef, useState } from "react";
import secondsToTime from "../utils/timeConversion";

export default function useCountDown(initialState) {
  const [seconds, setSeconds] = useState(initialState);
  const [isTimeLeft, setIsTimeLeft] = useState(true);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timeout;
    if (isRunning) {
      if (seconds === undefined || seconds === null) {
        console.log("invalid time");
      } else {
        if (seconds === 0) {
          setIsTimeLeft(false);
        } else {
          timeout = setTimeout(() => {
            setSeconds(seconds - 1);
          }, 1000);
        }
      }
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [seconds, isRunning]);

  const reset = () => setSeconds(0);

  const set = (seconds) => {
    setIsTimeLeft(true);
    setSeconds(seconds);
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  return [isTimeLeft, set, reset, pauseTimer, secondsToTime(seconds)];
}
