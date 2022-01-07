import React, { Fragment } from "react";
import FullWidthBackground from "../../components/Background/FullWidthBackground";
import Navbar from "../Navbar/navbar";
import Calendar from "../../components/Calendar/Calendar";
import "./home.scss";

const Home = (props) => {
  return (
    <Fragment>
      <FullWidthBackground id="main" />
      <Navbar/>
      <div className="home"><Calendar /></div>
    </Fragment>
  );
};

export default Home;
