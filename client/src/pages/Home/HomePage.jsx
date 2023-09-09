import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import "./HomePage.css";

function HomePage() {
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(!modal);
  return (
    <div className="container">
      <Modal closeModal={closeModal} modal={modal} />
      <Button
        text="Create Test"
        ph="10px"
        py="8px"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        clickFun={closeModal}
      />
    </div>
  );
}

export default HomePage;
