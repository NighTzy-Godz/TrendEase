import React, { useContext, KeyboardEvent } from "react";
import { FormContext } from "./Form";

interface FormInputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  isNumber?: boolean;
}

function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  isNumber = false,
}: FormInputProps) {
  const { data, handleChange } = useContext(FormContext);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isNumber) return;

    const isValidKey =
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Tab";

    if (!isValidKey) {
      event.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={data[name]}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </React.Fragment>
  );
}

export default FormInput;
