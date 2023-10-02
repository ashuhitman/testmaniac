import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";

import styles from "./Quiz.module.css";
import useCountDown from "../../Hooks/useCountDown";
import secondsToTime from "../../utils/timeConversion";

import { API_ENDPOINTS } from "../../utils/constants";
import Alert from "../../Components/Alert/Alert";

import TestContext from "../../context/Test/TestContext";
import { actions } from "../../context/Test/TestState";

function Quiz() {
  const { testState, dispatch } = useContext(TestContext);
  const showSolution = testState.showSolution;
  const navigate = useNavigate();
  // get test data
  const { state } = useLocation();
  // get document id
  const { docId } = useParams();
  const [testData, setTestData] = useState(state || null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTimeLeft, set, reset, time] = useCountDown(null);
  const [chosenOption, setChosenOption] = useState();
  const [chosenOptions, setChosenOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [submit, setSubmit] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log("Quiz: ", testState);
    if (showSolution) {
      reset();
      setChosenOptions(testState.chosenOptions);
      setCorrectAnswers(testState.correctOptions);
      setTestData(testState.test);
    } else {
      const test = testState.test;
      if (test) {
        setTestData(test);
        // set timer
        set(parseInt(test.timer) * 60);
      } else {
        if (!testData) {
          console.log(testData);
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
          // set the clock
          set(parseInt(testData.timer) * 60);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isTimeLeft && !submit && showSolution) {
      console.log(submit);
      setSubmit(true);
    }
    if (submit && !showSolution) {
      dispatch({
        type: actions.submit_test,
        payload: {
          chosenOptions,
          correctOptions: correctAnswers,
          data: testData,
        },
      });
      console.log("submitting...");
      console.log("time", time);
      const analytics = analyzeData(
        chosenOptions,
        correctAnswers,
        time,
        testData.timer
      );

      navigate(`/tests/${docId}/result`, { state: analytics });
    }
    setChosenOption(chosenOptions[currentQuestion]);
  }, [submit, isTimeLeft, currentQuestion]);

  const showHandler = (show) => {
    setShowAlert(show);
  };

  const onNext = () => {
    const totalQuestions = testData.questions.length;
    // submit = false, then add chosen option
    if (!submit) {
      chosenOptions[currentQuestion] = chosenOption;
      setChosenOptions(chosenOptions);

      if (currentQuestion < totalQuestions - 1) {
        setChosenOption();
      }
      let i = 0;
      for (let option of testData.questions[currentQuestion].options) {
        console.log(option);
        if (option.isAnswer) {
          correctAnswers[currentQuestion] = i;
          setCorrectAnswers(correctAnswers);
        }
        i = i + 1;
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
    setChosenOption(index);
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
            <Link to="/">
              <BiArrowBack />
            </Link>{" "}
            {testData.testName} ({testData.subject})
          </div>
          <div className={styles.links}>
            {!showSolution && (
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
            )}
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
                      backgroundColor:
                        showSolution && option.isAnswer ? "green" : "",
                    }}
                    className={
                      showSolution && !option.isAnswer
                        ? index === chosenOption
                          ? styles.chosenOption
                          : ""
                        : ""
                    }
                  >
                    <input
                      type="radio"
                      name="option"
                      id={"option" + index}
                      onChange={() => handleChange(index)}
                      value={option.text}
                      checked={index === chosenOption}
                      disabled={showSolution}
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

const analyzeData = (chosenOptions, correctOptions, time, totalTime) => {
  const totalQuestions = chosenOptions.length;

  let attempted = 0;
  let correct = 0;
  let wrong = 0;
  for (let i = 0; i < totalQuestions; i++) {
    if (chosenOptions[i] !== undefined) {
      attempted = attempted + 1;
      if (chosenOptions[i] === correctOptions[i]) {
        correct = correct + 1;
      } else {
        wrong = wrong + 1;
      }
    }
  }
  const score = correct - wrong;
  const accuracy = (correct * 100) / totalQuestions;

  // calaculate time left
  const { hoursString, minutesString, secondsString } = time;

  const leftSeconds =
    parseInt(hoursString) * 60 * 60 +
    parseInt(minutesString) * 60 +
    parseInt(secondsString);
  const timeTaken = secondsToTime(parseInt(totalTime) * 60 - leftSeconds);
  console.log(leftSeconds);
  const data = {
    labels: ["Attempted", "Correct", "Wrong"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Question Distribution",
        data: [attempted, correct, wrong],
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(200, 255, 255, 0.6)",
          "rgba(255, 200, 255, 0.6)",
          "rgba(255, 255, 200, 0.6)",
        ],
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  return [
    score,
    attempted,
    accuracy,
    totalQuestions,
    timeTaken,
    totalTime,
    data,
  ];
};

export default Quiz;
