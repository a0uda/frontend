import React from "react";

const Button = ({ buttText, onClick, className , type }) => {
  return (
    <button type={type} className={`rounded-pill blue-butt ${className}`} onClick={onClick}>
      {buttText}
    </button>
  );
};

export default Button;
