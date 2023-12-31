import React from "react";
import "../../assets/css/common/RadioBox.css";

interface RadioBoxData {
  id: number;
  name: string;
  value: string;
}

interface RadioBoxProps {
  data: RadioBoxData[];
  currValue: string;
  onRadioBoxClick(value: string): void;
}

function RadioBox({ data, currValue, onRadioBoxClick }: RadioBoxProps) {
  const renderRadioBoxes = data?.map((item) => {
    const radioBoxStyle =
      currValue === item.value ? " var(--plain-hover) " : "";
    return (
      <label className="label" key={item.id}>
        <input
          value={item.value}
          name="value-radio"
          className="radio-input"
          onClick={(e) => onRadioBoxClick(e.currentTarget.value)}
          type="radio"
        />
        <div
          className="radio-design"
          style={{ background: radioBoxStyle }}
        ></div>
        <div className="label-text">
          <p>{item.name}</p>
        </div>
      </label>
    );
  });

  return <div className="radio-input-wrapper">{renderRadioBoxes}</div>;
}

export default RadioBox;
