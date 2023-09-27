import React, { ChangeEvent } from "react";
import { ProductFilterData } from "../../interfaces/product";

interface SortDropDownProps {
  data: ProductFilterData[];
  label: string;
  name?: string;
  onDropDownChange(value: string): void;
}

function SortDropDown({
  data,
  name,
  label,
  onDropDownChange,
}: SortDropDownProps) {
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

export default SortDropDown;
