import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import styles from "./Quiz.module.css";
import useCountDown from "../../Hooks/useCountDown";
import secondsToTime from "../../utils/timeConversion";

function Quiz() {
  const { state } = useLocation();
  const questions = state.questions;
  const time = parseInt(state.timer);
  const totalQuestions = questions.length;

  const [
    isTimeLeft,
    reset,
    { hoursString: hh, minutesString: mm, secondsString: ss },
  ] = useCountDown(parseInt(time));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    // submit if time has finished
    if (submit || !isTimeLeft) {
      reset(0);
      console.log("submitting and score is " + score);
    }
  }, [isTimeLeft, submit]);

  const onNext = () => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion === totalQuestions - 1) {
      setSubmit(true);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  const onPrevious = () => {
    console.log("pre clicked");
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  return (
    <div className={styles.quiz}>
      <header className={styles["quiz-header"]}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            {state.testName} ({state.subject})
          </div>
          <div className={styles.links}>
            <div>
              {(submit || !isTimeLeft) && (
                <Link className={styles.link}>
                  Score: {score}/{totalQuestions}
                </Link>
              )}
              <Link className={styles.link}>
                Time Left <span>{hh}</span>: <span>{mm}</span>:<span>{ss}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <div>
          <strong>{currentQuestion + 1}.</strong>
          {questions[currentQuestion].question}
        </div>
        <div className={styles.options}>
          <ul>
            {questions[currentQuestion].options.map((option, index) => {
              return (
                <li
                  key={index}
                  className={option.isAnswer ? styles.correct : ""}
                >
                  <input
                    type="radio"
                    id={`option` + (index + 1)}
                    name="option"
                    value={option.text}
                    onChange={() => setIsCorrect(option.isAnswer)}
                  />
                  <label htmlFor={`option` + (index + 1)}>{option.text}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.footer}>
          <button onClick={onPrevious}>Previous</button>
          <button onClick={onNext}>Save & Next</button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
