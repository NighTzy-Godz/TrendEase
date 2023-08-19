import { Link, NavLink } from "react-router-dom";
import "./TopNavbar.css";
import ButtonLink from "../common/ButtonLink";
import { ButtonSize } from "../common/Button";

function TopNavbar() {
  return (
    <nav className="nav_top">
      <div className="container">
        <div className="logo">
          <Link to="/">TrendEase</Link>
        </div>

        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>

          <li>
            <NavLink to="/products">Cart</NavLink>
          </li>
        </ul>

        <div className="nav_auth">
          <ButtonLink size={ButtonSize.LARGE} path="/login">
            Login
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
