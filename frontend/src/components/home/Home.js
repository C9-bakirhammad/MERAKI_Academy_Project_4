import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserPart from "./UserPart";

const Home = () => {
  return (
    <div className="homeBg">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary homeNav">
        <div className="container-fluid">

          <div className="title">Sky</div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/profile">
                  MyProfile
                </Link>
              </li>
            </ul>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-sm btn-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="Bg container-fluid mt-2">
        <div className="row">
          <div className="col bg-white"> 
<UserPart/>
          </div>
          <div className="col-6">p
          </div>
          <div className="col">a</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
