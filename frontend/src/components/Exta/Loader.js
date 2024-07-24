import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="mainLoader">
      <div className="subMainLoader">
        <p className="message">Please wait just a minute, it take time</p>
        <div className="load"></div>
      </div>
    </div>
  );
};

export default Loader;
