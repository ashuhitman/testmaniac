import React from "react";
import styles from "./TestCard.module.css";
import { useNavigate } from "react-router-dom";

function TestCard({ cardData }) {
  const navigate = useNavigate();
  const { _id, testName, timer, questionAmount, subject, questions } = cardData;
  const goToQuizPage = () => {
    navigate(`/quiz/${_id}`, { state: cardData });
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
