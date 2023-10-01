import { useEffect, useState } from "react";
import secondsToTime from "../utils/timeConversion";

export default function useCountDown(initialState) {
  const [seconds, setSeconds] = useState(initialState);
  const [isTimeLeft, setIsTimeLeft] = useState(true);

  useEffect(() => {
    let timeout;
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

    return () => clearTimeout(timeout);
  }, [seconds]);

  const reset = () => setSeconds(0);

  const set = (seconds) => {
    setIsTimeLeft(true);
    setSeconds(seconds);
  };

  return [isTimeLeft, set, reset, secondsToTime(seconds)];
}
