import { ReactNode, MouseEvent } from "react";

export enum ButtonSize {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  X_SMALL = "x_small",
}

interface ButtonProps {
  children: ReactNode;
  className?: string;
  size: ButtonSize;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  children,
  className = "plain",
  size,
  handleClick = () => {},
}: ButtonProps) {
  return (
    <>
      <button className={`button ${size} ${className}`} onClick={handleClick}>
        {children}
      </button>
    </>
  );
}

export default Button;
