import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";

import styles from "./Quiz.module.css";
import useCountDown from "../../Hooks/useCountDown";
import secondsToTime from "../../utils/timeConversion";

import { API_ENDPOINTS } from "../../utils/constants";
import Alert from "../../Components/Alert/Alert";

function Quiz() {
  // get test data
  const { state } = useLocation();
  // get document id
  const { docId } = useParams();
  const [testData, setTestData] = useState(state || null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTimeLeft, set, reset, time] = useCountDown(null);
  const [chosenOption, selectChosenOption] = useState();
  const [chosenOptions, selectChosenOptions] = useState([]);
  const [submit, setSubmit] = useState();
  const [showSolutions, setShowSolutions] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!testData) {
      setTimeout(() => {}, 30000);
      axios(`${API_ENDPOINTS.TESTS}/${docId}`)
        .then((response) => {
          const data = response.data;
          // set test data
          setTestData(data);
          console.log("success", response);
          // set timer
          set(parseInt(data.timer) * 60);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      console.log("set clock");
      set(parseInt(testData.timer) * 60);
    }
  }, []);

  useEffect(() => {
    if (!isTimeLeft && !submit) {
      setSubmit(true);
    }
    if (submit) {
      console.log("submit quiz");
      reset();
      setShowSolutions(true);
    }
    selectChosenOption(chosenOptions[currentQuestion]);
  }, [submit, isTimeLeft, currentQuestion]);

  const showHandler = (show) => {
    setShowAlert(show);
  };

  const onNext = () => {
    const totalQuestions = testData.questions.length;
    // submit = false, then add chosen option
    if (!submit) {
      chosenOptions[currentQuestion] = chosenOption;
      selectChosenOptions(chosenOptions);
      if (currentQuestion < totalQuestions - 1) {
        selectChosenOption();
      }
    }
    // submit = true
    if (currentQuestion >= totalQuestions - 1 && !submit) setShowAlert(true);
    // increment only if it is less than the number of questions
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const onPrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleChange = (index) => {
    selectChosenOption(index);
  };
  if (!testData) {
    return (
      <div style={{ color: "black" }}>
        <p>loading...</p>
      </div>
    );
  }
  return (
    <div className={styles.quiz}>
      <Alert
        show={showAlert}
        showHandler={showHandler}
        title="Submit Quiz"
        body="Are you sure?"
        leftText="Yes"
        handleLeft={() => setSubmit(true)}
        rightText="No"
      />
      <header className={styles["quiz-header"]}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            {testData.testName} ({testData.subject})
          </div>
          <div className={styles.links}>
            <div>
              <Link className={styles.link}>
                <span className={styles.timeLeft}>Time Left</span>{" "}
                <span>
                  {time && time.hoursString ? time.hoursString : "00"}
                </span>{" "}
                :{" "}
                <span>
                  {time && time.minutesString ? time.minutesString : "00"}
                </span>{" "}
                :{" "}
                <span>
                  {time && time.secondsString ? time.secondsString : "00"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <div>
          <strong>Q{currentQuestion + 1}. </strong>{" "}
          {testData.questions[currentQuestion].question}
        </div>
        <div className={styles.options}>
          <ul>
            {testData.questions[currentQuestion].options.map(
              (option, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      backgroundColor: submit && option.isAnswer ? "green" : "",
                    }}
                    className={
                      submit &&
                      !option.isAnswer &&
                      (index === chosenOption ? styles.chosenOption : "")
                    }
                  >
                    <input
                      type="radio"
                      name="option"
                      id={"option" + index}
                      onChange={() => handleChange(index)}
                      value={option.text}
                      checked={index === chosenOption}
                      disabled={showSolutions}
                    />
                    <label htmlFor={"option" + index}>{option.text}</label>
                  </li>
                );
              }
            )}
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
