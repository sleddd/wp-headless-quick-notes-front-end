import React, { Fragment } from "react";
import{ Link } from "react-router-dom";
import { Clock } from "../../components/Clock/Clock";
import "./navbar.scss";

const Navbar = (props) => {
  return (
    <Fragment>
      <div className="navbar">
          <Link to="/">
            <Clock className="clock"/>
          </Link>
          <div className="hamburger">
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
