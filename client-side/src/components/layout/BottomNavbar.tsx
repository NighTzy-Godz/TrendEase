import React, { useState, useEffect } from "react";
import "./BottomNavbar.css";
import { Link, NavLink } from "react-router-dom";

import navbarData, { NavbarData } from "../../data/navbarData";
import useDeviceWidth from "../../hooks/useDeviceWidth";

interface BottonNavbarProps {
  token: string | null;
}

function BottomNavbar({ token }: BottonNavbarProps) {
  const { deviceWidth } = useDeviceWidth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const renderBotNavbar = () => {
    if (deviceWidth > 768)
      return (
        <div className="logo">
          <Link to="/">Trendease</Link>
          <p>&copy; Aser James Hubero</p>
        </div>
      );

    return <ul className="bot_nav_links">{renderNavbarLinks()}</ul>;
  };

  const renderNavbarLinks = () => {
    if (!isAuthenticated) {
      return navbarData.map((data) => {
        if (data.auth) return;
        return (
          <li key={data.id}>
            <NavLink to={data.path}>
              <i className={data.icon}></i>
              {data.name}
            </NavLink>
          </li>
        );
      });
    }
    return navbarData.map((data) => {
      if (data.name === "Login") return;
      return (
        <li key={data.id}>
          <NavLink to={data.path}>
            <i className={data.icon}></i>
            {data.name}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <nav className="bot_nav">
      <div className="container">{renderBotNavbar()}</div>
    </nav>
  );
}

export default BottomNavbar;
