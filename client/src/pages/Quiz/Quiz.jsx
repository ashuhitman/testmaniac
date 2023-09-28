import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";

import styles from "./Quiz.module.css";
import useCountDown from "../../Hooks/useCountDown";
import secondsToTime from "../../utils/timeConversion";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";

function Quiz() {
  const [loading, setLoading] = useState(false);
  // get document id
  const { docId } = useParams();
  // get passed data here
  const { state } = useLocation();
  const [testData, setTestData] = useState(state);

  // get left time
  const [
    isTimeLeft,
    reset,
    { hoursString: hh, minutesString: mm, secondsString: ss },
  ] = useCountDown(parseInt(null));
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
    if (testData === null) {
      setLoading(true);
      axios
        .get(`${API_ENDPOINTS.TESTS}/${docId}`)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setTestData(response.data);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      reset(testData.timer);
    }
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

  const onNext = () => {
    const totalQuestions = testData.questions.length;
    console.log("next clicked", chosenOption);
    // save the questionn no before going to next question
    preQuestion.current = currentQuestion;

    // updat ethe score
    if (isCorrect && !submit) {
      setScore(score + 1);
    }
    // save chosen option if submit is false
    if (!submit) {
      chosenOptions[currentQuestion] = chosenOption;
      setChosenOptions(chosenOptions);
    }

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

  if (loading) return <div>loading...</div>;

  return (
    <div className={styles.quiz}>
      <header className={styles["quiz-header"]}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            {testData && testData.testName} ({testData && testData.subject})
          </div>
          <div className={styles.links}>
            <div>
              {submit && (
                <Link className={styles.link}>
                  Score: {score}/{testData && testData.questions.length}
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
          {testData && testData.questions[currentQuestion].question}
        </div>
        <div className={styles.options}>
          <ul>
            {testData &&
              testData.questions[currentQuestion].options.map(
                (option, index) => {
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
                      <label htmlFor={`option` + (index + 1)}>
                        {option.text}
                      </label>
                    </li>
                  );
                }
              )}
          </ul>
        </div>
        <div className={styles.footer}>
          <button onClick={onPrevious}>Previous</button>
          <button onClick={onNext}>
            {currentQuestion == (testData && testData.questions.length) - 1 &&
            !submit
              ? "Submit"
              : "Save & Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
