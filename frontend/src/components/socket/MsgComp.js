import React from "react";
import { Link } from "react-router-dom";
import SocketApp from "./SocketApp";
import "./MsgComp.css";

const MsgComp = () => {
  return (
    <div className="MsgCompBody">
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-dark homeNav "
        style={{ backgroundColor: "#1b5acf" }}
      >
        <div className="row container-fluid">
          <div className="col homeMyprofile">
            <div className="title">Sky</div>
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

              <div className="col-4" style={{ textAlign: "center" }}>
                <Link className="nav-link active" to="/profile">
                  MyProfile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* --------------------------Body of component ---------------------------- */}
      <>
        <SocketApp />
      </>
    </div>
  );
};

export default MsgComp;
