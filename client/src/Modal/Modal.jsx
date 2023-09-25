import React, { useState } from "react";
import "./Modal.css";
import Button from "../Button/Button";
import OptionField from "../OptionField/OptionField";
import { validation } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Modal({ closeModal, modal }) {
  const navigate = useNavigate();
  // form values
  const [formValues, setFormValues] = useState({
    testName: "",
    subject: "",
    questionAmount: "",
    timer: "",
  });
  // form errors
  const [formErrors, setFormErrors] = useState({
    testName: "",
    subject: "",
    questionAmount: "",
    timer: "",
  });
  const [options, setOptions] = useState([
    { label: "Select Timer", value: "0" },
  ]);

  const submitFun = (e) => {
    e.preventDefault();

    const [isSubmit, errors] = validation(formValues);
    if (isSubmit) {
      // add test info to database

      const apiUrl = "https://test-maniac.onrender.com/tests/create";
      axios
        .post(apiUrl, formValues)
        .then((response) => {
          console.log("API Response:", response.data);
          // navigate("/tests/create", { state: { formValues } });
        })
        .catch((error) => console.error("Error", error));
    }
    setFormErrors({ ...formErrors, ...errors });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: "" });
    const optionItem = [{ label: "Select Timer", value: "0" }];
    if (name === "questionAmount") {
      // update timer field on change question amount field
      if (value >= 10) {
        for (let i = 0.5; i <= 2; i = i + 0.5) {
          let val = Math.floor((value * i) / 5) * 5;
          optionItem.push({ value: val, label: val + " minutes" });
        }
      }
      setOptions(optionItem);
    }
    console.log(e.target.value);
    setFormValues({ ...formValues, [name]: value });
  };

  if (!modal) return <></>;
  return (
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="modal-header">Test Details</div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <input
                type="text"
                placeholder="Test Name"
                name="testName"
                onChange={handleInputChange}
              />
              <p className="error">{formErrors.testName}</p>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Subject Name"
                name="subject"
                onChange={handleInputChange}
              />
              <p className="error">{formErrors.subject}</p>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Number of questions"
                name="questionAmount"
                onChange={handleInputChange}
                min="10"
              />
              <p className="error">{formErrors.questionAmount}</p>
            </div>
            <div className="form-group">
              <OptionField
                options={options}
                onChange={handleInputChange}
                error={formErrors.timer}
              />
            </div>
            <div className="form-footer">
              <Button
                type="button"
                text="Close"
                ph="8px"
                py="5px"
                radius="2px"
                clickFun={closeModal}
              />
              <span style={{ margin: "0 10px" }} />
              <Button
                type="submit"
                text="Create"
                ph="8px"
                py="5px"
                radius="2px"
                clickFun={submitFun}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
