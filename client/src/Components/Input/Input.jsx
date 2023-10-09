import React from "react";
import styles from "./Input.module.css";

function Input() {
  return (
    <div className={styles.inputContainer}>
      <input />
      <div className={styles.labelline}>Email</div>
    </div>
  );
}

export default Input;
