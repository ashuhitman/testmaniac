import React from "react";
import "./OptionField.css";

function OptionField({ options, value, onChange }) {
  return (
    <select value={value} onChange={onChange} name="timer">
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default OptionField;
