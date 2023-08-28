import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./TopNavbar.css";
import ButtonLink from "../common/ButtonLink";
import Button, { ButtonSize } from "../common/Button";

interface TopNavbarProps {
  token: string;
}

function TopNavbar({ token }: TopNavbarProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) setIsAuthenticated(true);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

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
          {!isAuthenticated ? (
            <ButtonLink size={ButtonSize.LARGE} path="/login">
              Login
            </ButtonLink>
          ) : (
            <Button size={ButtonSize.LARGE} handleClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
