import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../Components/Input/Input";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.loginContainer}>
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
  );
}

export default Login;
