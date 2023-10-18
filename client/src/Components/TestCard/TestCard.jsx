import React, { useContext } from "react";
import styles from "./TestCard.module.css";
import { useNavigate } from "react-router-dom";
import TestContext from "../../context/Test/TestContext";
import { actions } from "../../context/Test/TestState";

function TestCard({ cardData }) {
  const navigate = useNavigate();
  const { _id, testName, timer, questionAmount, subject, questions } = cardData;
  const { testState, dispatch } = useContext(TestContext);
  const goToQuizPage = () => {
    dispatch({ type: actions.reset, payload: { test: cardData } });
    navigate(`/tests/${_id}`, { state: cardData });
  };
  return (
    <div className={styles.card}>
      <div className={styles["card-head"]}>{testName}</div>
      <div className={styles["card-body"]}>
        <div>
          Subject: <span>{subject}</span>
        </div>
        <div>
          Question Count: <span>{questionAmount}</span>
        </div>
        <div>
          Time: <span>{timer} minutes</span>
        </div>
      </div>
      <div className={styles["card-footer"]}>
        <button onClick={goToQuizPage}>Start the Test</button>
      </div>
    </div>
  );
}

export default TestCard;
