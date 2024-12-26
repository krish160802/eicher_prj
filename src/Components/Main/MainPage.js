import React from "react";
import images from "../../assets/images.png";
import touch from "../../assets/touch.jpg";
import "./MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="main">
      <div className="mainhead">
        <img src={images} alt="Eicher Motors Logo" />
      </div>
      <div className="mainbody">
        <p>
          <b>WELCOME TO EICHER MOTORS</b>
        </p>
      </div>
      <div className="mainfoot">
        <Link to="/selectpage">
          <img src={touch} alt="Touch to Start" />
        </Link>
        <p>
          <b>Touch to Start</b>
        </p>
      </div>
    </div>
  );
};

export default MainPage;
