import React, { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.singUp}>
        <h2>Signup</h2>
        <form>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="psd" placeholder="Re-enter password" />
          <input type="text" name="mobileno" placeholder="Mobile number" />
          <button type="submit">SIGN UP</button>
        </form>
        <Link to="/">Goto HomePage</Link>
      </div>
    </div>
  );
}

export default Signup;
