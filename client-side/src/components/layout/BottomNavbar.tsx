import React from "react";
import "./BottomNavbar.css";
import { Link, NavLink } from "react-router-dom";

import navbarData from "../../data/navbarData";
import useDeviceWidth from "../../hooks/useDeviceWidth";
function BottomNavbar() {
  const { deviceWidth } = useDeviceWidth();

  const renderBotNavbar = () => {
    if (deviceWidth > 768)
      return (
        <div className="logo">
          <Link to="/">Trendease</Link>
          <p>&copy; Aser James Hubero</p>
        </div>
      );

    return <ul className="bot_nav_links">{renderNavbarLinks}</ul>;
  };

  const renderNavbarLinks = navbarData.map((data) => {
    return (
      <li key={data.id}>
        <NavLink to={data.path}>
          <i className={data.icon}></i>
          {data.name}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="bot_nav">
      <div className="container">{renderBotNavbar()}</div>
    </nav>
  );
}

export default BottomNavbar;
