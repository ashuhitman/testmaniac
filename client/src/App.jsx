import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Modal />
      <Button
        text="Create Test"
        ph="10px"
        py="8px"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      />
    </div>
  );
}

export default App;
