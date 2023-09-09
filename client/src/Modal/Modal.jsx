import React, { useState } from "react";
import "./Modal.css";
import Button from "../Button/Button";
import OptionField from "../OptionField/OptionField";
import validation from "../utils/validation";
import { useNavigate } from "react-router-dom";

function Modal({ closeModal, modal }) {
  const navigate = useNavigate();
  // form values
  const [formValues, setFormValues] = useState({
    test_name: "",
    subject: "",
    questions: "",
    timer: "",
  });
  // form errors
  const [formErrors, setFormErrors] = useState({
    test_name: "",
    subject: "",
    questions: "",
    timer: "",
  });
  const [options, setOptions] = useState([
    { label: "Select Timer", value: "0" },
  ]);

  const submitFun = (e) => {
    e.preventDefault();

    const [isSubmit, errors] = validation(formValues);
    if (isSubmit) {
      console.log(formValues);
      navigate("/tests/create", { state: { formValues } });
      return;
    }
    setFormErrors({ ...formErrors, ...errors });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: "" });
    const options = [];
    if (name === "questions") {
      if (value >= 12) {
        for (let i = 0.5; i <= 2; i = i + 0.5) {
          let val = Math.floor((value * i) / 5) * 5;
          options.push({ value: val, label: val + " minutes" });
        }
      }
      setOptions(options);
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
                name="test_name"
                onChange={handleInputChange}
              />
              <p className="error">{formErrors.test_name}</p>
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
                name="questions"
                onChange={handleInputChange}
                min="10"
              />
              <p className="error">{formErrors.questions}</p>
            </div>
            <div className="form-group">
              <OptionField options={options} onChange={handleInputChange} />
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
