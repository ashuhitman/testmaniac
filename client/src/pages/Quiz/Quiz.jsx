import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiSolidChevronRightSquare } from "react-icons/bi";
import { CgMenu } from "react-icons/cg";

import styles from "./Quiz.module.css";
import useCountDown from "../../Hooks/useCountDown";
import secondsToTime from "../../utils/timeConversion";

import { API_ENDPOINTS } from "../../utils/constants";
import Alert from "../../Components/Alert/Alert";

import TestContext from "../../context/Test/TestContext";

import quizReducer, {
  quizActions,
  quizintialState,
} from "../../reducers/QuizReducers";
import { actions } from "../../context/Test/TestState";
import {
  analytics,
  getDefinedElemenentCount,
  visitedQuestion,
} from "../../utils/utils";
import CircularImage from "../../Components/CircularImage/CircularImage";

function Quiz() {
  const { testState, dispatch } = useContext(TestContext);
  const [quizState, quizDispatch] = useReducer(quizReducer, quizintialState);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [submit, setSubmit] = useState(false);

  // console.log("quiz initialized: ", quizState);
  // get document id
  const { docId } = useParams();
  const [isTimeLeft, set, reset, time] = useCountDown(null);
  useEffect(() => {
    if (testState.test) {
      // set timer
      set(parseInt(testState.test.timer) * 60);
    } else {
      console.log("loading test state");
      // if test data not available then fetch it
      axios(`${API_ENDPOINTS.TESTS}/${docId}`)
        .then((response) => {
          console.log(response.data);
          const test = response.data;
          // set test data
          dispatch({ type: actions.update_test, payload: { test } });
          // set timer
          set(parseInt(test.timer) * 60);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    // check if it is mobile
    const isMobile = window.innerWidth > 600;
    console.log("screen width: ", isMobile);
    setShowSidebar(isMobile);
  }, []);

  useEffect(() => {
    if (!isTimeLeft && !submit && !testState.showSolution) {
      setSubmit(true);
    }
    if (submit && !testState.showSolution) {
      // analytics
      const analyticData = analytics(quizState.answers, testState.test);
      dispatch({ type: actions.submit_test, payload: analyticData });
      console.log("submitting...", analyticData);

      // navigate(`/tests/${docId}/result`);
    }
  }, [submit, isTimeLeft]);

  // on previous button click
  const onPrevious = () => {
    let currentQuestion = quizState.currentQuestion;
    // if current question is 1
    if (currentQuestion === 0) return;
    //else decrement current question
    currentQuestion = currentQuestion - 1;

    // selected option
    const answers = quizState.answers;
    const answer = answers[currentQuestion];
    const selectedOption = answer && answer.selectedOption;
    // answers
    // check if already answered
    // check if not answered and not visited
    if (!answer) {
      answers[currentQuestion] = { selectedOption: null, correctAnswer: null };
    }

    quizDispatch({
      type: quizActions.pre_button,
      payload: { currentQuestion, selectedOption, answers },
    });
  };
  // on next button click
  const onNext = () => {
    // if current question is equal to total question
    //else increment current question
    const currentQuestion = quizState.currentQuestion;
    const nextQuestion =
      quizState.currentQuestion === testState.test.questions.length - 1
        ? 0
        : quizState.currentQuestion + 1;

    // answers
    const options = testState.test.questions[quizState.currentQuestion].options;
    const correctOption = options.find((option) => option.isAnswer);
    const answers = [...quizState.answers];

    answers[currentQuestion] = {
      selectedOption: quizState.selectedOption,
      correctAnswer: correctOption.text,
    };

    // selected option
    const selectedOption = answers[nextQuestion]
      ? answers[nextQuestion].selectedOption
      : null;

    quizDispatch({
      type: quizActions.next_button,
      payload: {
        currentQuestion: nextQuestion,
        answers,
        selectedOption,
        visited: quizState.visited + 1,
      },
    });
  };
  // on option change or question no button click
  const handleChange = (chosenOption) => {
    if (testState.showSolution) return;
    // setSelectedOption(chosenOption);
    quizDispatch({
      type: quizActions.select_option,
      payload: { selectedOption: chosenOption },
    });
  };
  const questionButtonClasses = (i) => {
    const currentQuestion = quizState.currentQuestion;
    const activeClass = currentQuestion === i ? styles["active-question"] : "";
    if (testState.showSolution) {
      return activeClass;
    }

    const answer = quizState.answers[i];
    if (answer) {
      const attemptedClass = answer.selectedOption
        ? styles["attempted-question"]
        : "";
      const notAttemptedClass =
        answer.selectedOption === null ? styles["not-attempted"] : "";
      return `${activeClass} ${notAttemptedClass} ${attemptedClass}`;
    }
    return activeClass;
  };
  const handleQuestionButtonClick = (i) => {
    const currentQuestion = quizState.currentQuestion;
    // if same question
    if (currentQuestion === i) return;
    // else update current question
    const answers = [...quizState.answers];
    const answer = answers[i];
    const selectedOption = answer ? answer.selectedOption : null;
    const correctAnswer = answer ? answer.correctAnswer : null;

    answers[i] = { selectedOption, correctAnswer };
    quizDispatch({
      type: quizActions.visit_question,
      payload: {
        currentQuestion: i,
        selectedOption,
        answers,
        visited: quizState.visited + 1,
      },
    });
  };
  const clearResponse = () => {
    const selectedOption = null;
    const answers = quizState.answers;
    const answer = answers[quizState.currentQuestion];
    console.log("clear resonse button clicked: ", answers);
    if (answer) {
      answers[quizState.currentQuestion] = {
        selectedOption: null,
        correctAnswer: answer.correctAnswer,
      };
    }
    quizDispatch({
      type: quizActions.clear_response,
      payload: { answers, selectedOption },
    });
  };

  const getWrongColor = (option) => {
    if (!testState.showSolution) return;
    const answer = quizState.answers[quizState.currentQuestion];
    if (option.isAnswer) return;
    if (answer) {
      if (answer.selectedOption) {
        if (answer.selectedOption === option.text) return "red";
      }
    }
  };

  if (!testState.test) {
    return <div style={{ color: "black" }}>Loading...</div>;
  }

  return (
    <div className={styles.quiz}>
      <Alert
        show={showAlert}
        showHandler={setShowAlert}
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
            {testState.test.testName}
          </div>
          <div className={styles.links}>
            {!testState.showSolution && (
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

      <div className={styles["quiz-container"]}>
        {showSidebar && (
          <div
            className={styles.overlay}
            onClick={() => setShowSidebar(false)}
          ></div>
        )}
        <div className={styles["sub-header"]}>
          Subject: {testState.test.subject}
          <CgMenu
            color="#6D214F"
            size="1.6rem"
            onClick={() => setShowSidebar(true)}
            style={{
              marginLeft: "auto",

              cursor: "pointer",
            }}
          />
        </div>
        <div
          className={
            showSidebar
              ? `${styles["quiz-box"]} ${styles.shiftRight}`
              : `${styles["quiz-box"]} ${styles.shiftLeft}`
          }
        >
          <div>
            <strong>Q{quizState.currentQuestion + 1}. </strong>{" "}
            {testState.test.questions[quizState.currentQuestion].question}
          </div>
          <div className={styles.options}>
            <ul>
              {testState.test.questions[quizState.currentQuestion].options.map(
                (option, index) => {
                  return (
                    <li
                      onClick={() => handleChange(option.text)}
                      key={index}
                      style={{
                        backgroundColor:
                          testState.showSolution && option.isAnswer
                            ? "green"
                            : getWrongColor(option),
                      }}
                    >
                      <input
                        type="radio"
                        name="option"
                        id={"option" + index}
                        value={option.text}
                        checked={quizState.selectedOption === option.text}
                        onChange={(e) => handleChange(e.target.value)}
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
            <button onClick={clearResponse}>
              Clear <span className={styles.clear}>Response</span>
            </button>
            {/* {testState.showSolution && <div>Re-attempt Questions</div>} */}
            <button onClick={onNext}>Save & Next</button>
          </div>
        </div>
        <div
          className={
            showSidebar
              ? `${styles.sidebar} ${styles.showSidebar}`
              : `${styles.sidebar} ${styles.hideSidebar}`
          }
        >
          <BiSolidChevronRightSquare
            size="2rem"
            onClick={() => setShowSidebar(false)}
            color="#6D214F"
            className={styles.close}
          />
          <div className={styles.profile}>
            <CircularImage
              size="30px"
              imageUrl="https://sketchok.com/images/articles/02-comics/002-superheroes/132/16.jpg"
            />
            <div>Ashutsh Singh</div>
          </div>
          <div className={styles.sideUpper}>
            {!testState.showSolution ? (
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <td>Answered</td>
                    <td>Not Answered</td>
                    <td>Not Visited</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{getDefinedElemenentCount(quizState.answers)}</th>
                    <th>
                      {testState.test.questions.length -
                        getDefinedElemenentCount(quizState.answers)}
                    </th>
                    <th>
                      {testState.test.questions.length -
                        visitedQuestion(quizState.answers)}
                    </th>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <td>Correct</td>
                    <td>Wrong</td>
                    <td>Accuracy</td>
                    <td>Score</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {testState.showSolution && testState.analytics.correct}
                    </th>
                    <th>
                      {testState.showSolution && testState.analytics.wrong}
                    </th>
                    <th>
                      {testState.showSolution && testState.analytics.accuracy} %
                    </th>
                    <th>
                      {testState.showSolution &&
                        testState.analytics.correct -
                          testState.analytics.wrong}{" "}
                      /{" "}
                      {testState.showSolution &&
                        testState.analytics.totalQuestions}
                    </th>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className={styles["question-nos"]}>
            {[...Array(testState.test.questions.length)].map((e, i) => (
              <button
                key={i}
                onClick={() => {
                  handleQuestionButtonClick(i);
                }}
                className={questionButtonClasses(i)}
                style={{
                  backgroundColor: testState.showSolution
                    ? testState.analytics.solutions[i]
                      ? "green"
                      : testState.analytics.solutions[i] == 0
                      ? "red"
                      : ""
                    : "",
                  color: testState.showSolution
                    ? testState.analytics.solutions[i]
                      ? "white"
                      : testState.analytics.solutions[i] == 0
                      ? "white"
                      : ""
                    : "",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={testState.showSolution}
            className={styles.submitButton}
            onClick={() => !testState.showSolution && setShowAlert(true)}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
