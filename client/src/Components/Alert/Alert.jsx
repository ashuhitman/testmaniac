import React, { useState } from "react";
import styles from "./Alert.module.css";
import Button from "../Button/Button";

function Alert({
  show = false,
  showHandler,
  title = "Alert Info",
  body,
  handleLeft = null,
  leftText,
  rightText = "OK",
}) {
  if (!show) return <></>;
  return (
    <div className={styles.overlay}>
      <div className={styles.alert}>
        <div className={styles.alertHead}>{title}</div>
        <div className={styles.alertBody}>{body}</div>
        <div className={styles.alertFooter}>
          {handleLeft && (
            <button
              onClick={() => {
                handleLeft();
                showHandler(false);
              }}
            >
              {leftText}
            </button>
          )}
          <button onClick={() => showHandler(false)}>{rightText}</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
