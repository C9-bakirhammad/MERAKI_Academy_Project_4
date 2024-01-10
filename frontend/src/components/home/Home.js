import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeBg">
      <div className="homeNav">
        <div>
          <h3 className="header">Sky</h3>
        </div>

        <div>
          <input type="text" placeholder="search" />
        </div>

        <div className="navElem">
          <Link className="navElem" to="/home">
            Home
          </Link>
          ||
          <Link className="navElem" to="/profile">
            My Profile
          </Link>
          <p className="navElem">SignOut</p>
        </div>
      </div>

      <div className="Bg container">
        <div className="row">
          <div className="col">f</div>
          <div className="col-6">s</div>
          <div className="col">a</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
