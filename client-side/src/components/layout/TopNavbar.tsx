import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./TopNavbar.css";
import ButtonLink from "../common/ButtonLink";
import { ButtonSize } from "../common/Button";
import { useSelector } from "react-redux";

import { State } from "../../store/store";

interface TopNavbarProps {
  token: string | null;
  deviceWidth: number;
}

function TopNavbar({ token, deviceWidth }: TopNavbarProps) {
  const userCart = useSelector((state: State) => state.entities.cart.cart);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const renderNavbarContent = () => {
    if (deviceWidth < 768)
      return (
        <div className="logo">
          {" "}
          <Link to="/">Trendease</Link>{" "}
        </div>
      );
    return (
      <React.Fragment>
        {" "}
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
                <NavLink
                  to="/cart"
                  id="top_nav_cart"
                  data-count={userCart.length}
                >
                  Cart
                </NavLink>
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
      </React.Fragment>
    );
  };

  return (
    <nav className="nav_top">
      <div className="container">{renderNavbarContent()}</div>
    </nav>
  );
}

export default TopNavbar;
