import React, { useState } from "react";
import styles from "./Auth.module.css";
import Input from "../../Components/Input/Input";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthState = (e) => {
    console.log("clicked");
    e.preventDefault();
    setIsLogin(!isLogin);
  };
  return (
    <div className={styles.authContainer}>
      {isLogin ? (
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form className={styles.loginForm}>
            <input type="email" name="email" id="email" placeholder="email" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <button type="submit">LOGIN</button>
          </form>
          <a onClick={changeAuthState}>Are you new? Signup</a>
        </div>
      ) : (
        <div className={styles.singUp}>
          <h2>Signup</h2>
          <form>
            <input type="text" name="name" placeholder="name" />
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <input type="password" name="psd" placeholder="Re-enter password" />
            <input type="text" name="mobileno" placeholder="mobile number" />
            <button type="submit">SIGN UP</button>
          </form>
          <a onClick={changeAuthState}>Already have an account? Login</a>
        </div>
      )}
    </div>
  );
}

export default Auth;
