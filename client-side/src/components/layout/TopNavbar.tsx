import { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./TopNavbar.css";
import ButtonLink from "../common/ButtonLink";
import Button, { ButtonSize } from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/slices/cart";
import { State } from "../../store/store";

interface TopNavbarProps {
  token: string | null;
}

function TopNavbar({ token }: TopNavbarProps) {
  const userCart = useSelector((state: State) => state.entities.cart.cart);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

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
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/create-product">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart {userCart.length}</NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="nav_auth">
          {!isAuthenticated ? (
            <ButtonLink size={ButtonSize.LARGE} path="/login">
              Login
            </ButtonLink>
          ) : (
            <ButtonLink path="/profile" size={ButtonSize.LARGE}>
              Profile
            </ButtonLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
