import React, { useState } from "react";
import "./TestPage.css";
import Button from "../../Button/Button";
import { useLocation } from "react-router-dom";

function TestPage() {
  const location = useLocation();
  const upperCount = parseInt(location.state.formValues.questions);
  const [count, setCount] = useState(0);

  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [correctOption, setCorrectOption] = useState({});

  const onNext = () => {
    if (count + 1 >= upperCount) return;
    setCount((prev) => prev + 1);
  };

  const onPrevious = () => {
    if (count === 0) return;
    console.log("pre killed");
    setCount((prev) => prev - 1);
  };
  const handleRadioChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const handleInputChange = (e) =>
    setOptions({ ...options, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("go to score page");
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="form-group question-title">
          <label htmlFor="question_title">
            <strong>Question {count + 1}.</strong>
          </label>
          <input
            type="text"
            id="question_title"
            name="question_title"
            placeholder="Enter the question here"
          />
        </div>
        <div className="form-goroup question-option">
          <input
            type="radio"
            id="option1"
            onChange={handleRadioChange}
            name="option-group"
            value={options.option1}
          />

          <input
            type="text"
            name="option1"
            placeholder="option 1"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-goroup question-option">
          <input
            type="radio"
            id="option2"
            onChange={handleRadioChange}
            name="option-group"
            value={options.option2}
          />

          <input
            type="text"
            name="option2"
            placeholder="option 2"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-goroup question-option">
          <input
            type="radio"
            id="option3"
            onChange={handleRadioChange}
            name="option-group"
            value={options.option3}
          />

          <input
            type="text"
            name="option3"
            placeholder="option 3"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-goroup question-option">
          <input
            type="radio"
            id="option4"
            onChange={handleRadioChange}
            name="option-group"
            value={options.option4}
          />

          <input
            type="text"
            placeholder="option 4"
            name="option4"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-footer">
          <Button
            type="button"
            text="Previous"
            disabled={count === 0 ? true : false}
            clickFun={onPrevious}
          />
          <Button
            type={upperCount === count + 1 ? "submit" : "button"}
            text="Next"
            clickFun={onNext}
          />
        </div>
      </form>
    </div>
  );
}

export default TestPage;
