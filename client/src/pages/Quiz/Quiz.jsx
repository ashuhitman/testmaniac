import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import styles from "./Quiz.module.css";
import useCountDown from "../../Hooks/useCountDown";
import secondsToTime from "../../utils/timeConversion";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";

function Quiz() {
  // get passed data here
  const { state } = useLocation();

  const time = parseInt(state.timer);

  const [questions, setQuestions] = useState(state.questions);
  const totalQuestions = questions.length;

  // get left time
  const [
    isTimeLeft,
    reset,
    { hoursString: hh, minutesString: mm, secondsString: ss },
  ] = useCountDown(parseInt(time));
  // set current questions
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // set score
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [chosenOptions, setChosenOptions] = useState([]);
  const [chosenOption, setChosenOption] = useState();
  const preQuestion = useRef(0);
  const [showSolutions, setShowSolutions] = useState(false);
  useEffect(() => {
    console.log(questions);
    // if(questions === null || questions === undefined) {
    //   axios.get(API_ENDPOINTS.QUESTIONS)
    // }
  }, []);
  useEffect(() => {
    // submit if time has finish

    if (!isTimeLeft) {
      setSubmit(true);
    }
    if (submit) {
      reset(0);
      setShowSolutions(true);
      console.log(chosenOptions);
      console.log("submitting and score is " + score);
    }
    setChosenOption(chosenOptions[currentQuestion]);
  }, [isTimeLeft, submit, currentQuestion]);

  // useEffect(() => {
  //   setChosenOption(chosenOptions[currentQuestion]);
  // }, [currentQuestion]);

  const onNext = () => {
    console.log("next clicked", chosenOption);
    // save the questionn no before going to next question
    preQuestion.current = currentQuestion;

    // updat ethe score
    if (isCorrect && !submit) {
      setScore(score + 1);
    }
    // save chosen option
    chosenOptions[currentQuestion] = chosenOption;
    setChosenOptions(chosenOptions);

    // if last question then submit
    if (currentQuestion === totalQuestions - 1) {
      setSubmit(true);
      return;
    }

    // clean chisen option
    setChosenOption("");
    // increment current question number
    setCurrentQuestion(currentQuestion + 1);
  };

  const onPrevious = () => {
    console.log("pre clicked");
    if (isCorrect && !submit) {
      setScore(score - 1);
    }
    // save the questionn no before going to next question
    preQuestion.current = currentQuestion;
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const colorCodeCorrectAndWrongAnswer = (option, index) => {
    if (showSolutions) {
      if (index === chosenOptions[currentQuestion]) {
        return true;
      }
    }
    return false;
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
              {submit && (
                <Link className={styles.link}>
                  Score: {score}/{totalQuestions}
                </Link>
              )}
              <Link className={styles.link}>
                <span className={styles.timeLeft}>Time Left</span>{" "}
                <span>{hh}</span> : <span>{mm}</span> : <span>{ss}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <div>
          <strong>{currentQuestion + 1}. </strong>
          {questions[currentQuestion].question}
        </div>
        <div className={styles.options}>
          <ul>
            {questions[currentQuestion].options.map((option, index) => {
              return (
                <li
                  key={index}
                  style={{
                    backgroundColor:
                      option.isAnswer && showSolutions && "green",
                  }}
                  className={
                    colorCodeCorrectAndWrongAnswer(option, index)
                      ? styles.chosenOption
                      : ""
                  }
                >
                  <input
                    type="radio"
                    id={`option` + (index + 1)}
                    name="option"
                    value={option.text}
                    checked={chosenOption === index}
                    onChange={() => {
                      setIsCorrect(option.isAnswer);
                      setChosenOption(index);
                    }}
                  />
                  <label htmlFor={`option` + (index + 1)}>{option.text}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.footer}>
          <button onClick={onPrevious}>Previous</button>
          <button onClick={onNext}>
            {currentQuestion == totalQuestions - 1 && !submit
              ? "Submit"
              : "Save & Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
