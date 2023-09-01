import React from "react";

function Button({
  type = "text",
  text,
  color,
  bgColor,
  ph,
  py,
  radius,
  bw,
  bs,
  borderColor,
  boxShadow,
  fontSize,
}) {
  const btnStyle = {
    fontSize: fontSize,
    cursor: "pointer",
    color: color || "black",
    backgroundColor: bgColor || "white",
    paddingLeft: ph,
    paddingRight: ph,
    paddingTop: py,
    paddingBottom: py,
    borderRadius: radius || "2px",
    boderWidth: bw || "1px",
    borderStyle: bs || "solid",
    borderColor: borderColor || "white",
    boxShadow: boxShadow || "",
  };
  return (
    <button type={type} style={btnStyle}>
      {text}
    </button>
  );
}

export default Button;
