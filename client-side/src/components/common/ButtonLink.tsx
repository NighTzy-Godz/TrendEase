import { ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/common/Button.css";
import { ButtonSize } from "./Button";

interface ButtonLinkProps {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  path: string;
  handleClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

function ButtonLink({
  children,
  className = "plain",
  size,
  path,
  handleClick = () => {},
}: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className={`button ${size} ${className}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
