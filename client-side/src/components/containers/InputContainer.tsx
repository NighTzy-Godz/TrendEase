import React from "react";
import "./InputContainer.css";

interface InputContainerProps {
  children: React.ReactNode;
}

function InputContainer({ children }: InputContainerProps) {
  return <div className="form_input_container">{children}</div>;
}

export default InputContainer;
