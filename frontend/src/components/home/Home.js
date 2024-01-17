import React, { useContext } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import UserPart from "./userPart/UserPart";
import PostsPart from "./postsPart/PostsPart";
import { usersContext } from "../../App";

const Home = () => {
  const { setToken } = useContext(usersContext);
  const navigate = useNavigate();

  return (
    <div className="homeBg">
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-dark homeNav "
        style={{ backgroundColor: "#1b5acf" }}
      >
        <div className="row container-fluid">
          <div className="col">
            <div className="title">Sky</div>
          </div>

          <div className="col divSearch">
            {" "}
            <input className="search" type="search" placeholder=" Search" />
            <button className="searchButton">Search</button>
          </div>

          <div className="col" style={{ textAlign: "end", color: "white" }}>
            <div className="row">
              <div className="col" style={{ textAlign: "end" }}>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </div>

              <div className="col-4" style={{ textAlign: "start" }}>
                <Link className="nav-link active" to="/profile">
                  MyProfile
                </Link>
              </div>
              <div className="col-1">
                <svg
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    localStorage.clear();
                    setToken("");
                    navigate("/login");
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col ms-2 me-2 userbg">
            <UserPart />
          </div>
          <div className="col-5 me-2">
            <PostsPart />
          </div>
          <div className="col me-2">a</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
