import React from "react";
import "../../assets/css/common/404.css";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="no_page">
      <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" />
      <h1 className="error-text">
        Whoops, We can't seem to find the resource you're looking for.
      </h1>
      <p className="text">
        Please check that the Web site address is spelled correctly.
      </p>
      <div className="btn1">
        <Link className="error" to="/">
          {" "}
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NoPage;
