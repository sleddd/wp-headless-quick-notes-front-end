/*
* External Dependencies
*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

/*
* Internal Dependencies
*/
import { Clock } from "../../components/Clock/Clock";
import FullWidthMenu from "../../components/FullWidthMenu/FullWidthMenu";
import { useToggleClass } from "../../hooks/use-toggle-class";


import "./navbar.scss";

const Navbar = (props) => {
  const [toggleClass, toggle] = useToggleClass('open', {
    open: 'closed',
    closed: 'open'
  });
  
  return (
    <Fragment>
      <div className="navbar">
        <Link to="/">
          <Clock className="clock" />
        </Link>
        <div className="hamburger" onClick={toggle}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <FullWidthMenu className={toggleClass} />
    </Fragment>
  );
};
export default Navbar;
