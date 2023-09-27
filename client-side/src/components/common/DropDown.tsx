import React from "react";

interface DropDownData {
  id: number;
  name: string;
  value: string;
}

interface DropDownProps {
  data: DropDownData[];
  label: string;
  name?: string;
  onDropDownChange(value: string): void;
}

function DropDown({ data, name, label, onDropDownChange }: DropDownProps) {
  const renderDropDownOptions = data.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  return (
    <React.Fragment>
      <label className="dropDown_label">{label}</label>
      <select
        name={label}
        id={label}
        onChange={(e) => onDropDownChange(e.currentTarget.value)}
      >
        {renderDropDownOptions}
      </select>
    </React.Fragment>
  );
}

export default DropDown;
