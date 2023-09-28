import { useEffect, useState } from "react";
import secondsToTime from "../utils/timeConversion";

export default function useCountDown(initialState) {
  const [seconds, setSeconds] = useState(initialState * 60);
  const [isTimeLeft, setIsTimeLeft] = useState(true);

  useEffect(() => {
    if (seconds === undefined || seconds === null) {
      setSeconds(0);
      return;
    }
    if (seconds === 0) {
      setIsTimeLeft(false);
      return;
    }
    const timeout = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [seconds]);

  const reset = () => setSeconds(0);

  const set = (seconds) => setSeconds(seconds);

  return [isTimeLeft, reset, secondsToTime(seconds)];
}
