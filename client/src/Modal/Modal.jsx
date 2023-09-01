import React from "react";
import "./Modal.css";
import Button from "../Button/Button";
import OptionField from "../OptionField/OptionField";

function Modal() {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <div className="modal-header">Test Details</div>
        <div className="modal-body">
          <form action="">
            <div className="form-group">
              <input type="text" placeholder="Text Name" />
              <p></p>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject Name" />
              <p></p>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Number of questions" />
              <p></p>
            </div>
            <div className="form-group">
              <OptionField />
            </div>
            <div className="form-footer">
              <Button
                type="button"
                text="Close"
                ph="8px"
                py="5px"
                radius="2px"
              />
              <span style={{ margin: "0 10px" }} />
              <Button
                type="submit"
                text="Create"
                ph="8px"
                py="5px"
                radius="2px"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
