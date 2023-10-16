import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css"; // Import your CSS file for styling
import Modal from "../Modal/Modal";

function Header() {
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(!modal);
  const handleClick = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <div className={styles.navbar}>
      <Modal closeModal={closeModal} modal={modal} />
      <div className={styles.logo}>Test Maniac</div>
      <div className={styles.links}>
        <div>
          <Link className={styles.link} onClick={handleClick}>
            Create Test
          </Link>
        </div>
        <div>
          <Link to="/auth/login" className={styles.link}>
            Login
          </Link>
        </div>
        <div>
          <Link to="/auth/signup" className={styles.link}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
