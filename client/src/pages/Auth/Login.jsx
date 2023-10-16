import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../Components/Input/Input";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form className={styles.loginForm}>
          <input type="email" name="email" id="email" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button type="submit">LOGIN</button>
        </form>
        <Link to="/">Goto HomePage</Link>
      </div>
    </div>
  );
}

export default Login;
