import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../myProfile/MyProfile.css";
import axios from "axios";
import { usersContext } from "../../App";

const MyProfile = () => {
  const [profileUser, setProfileUser] = useState({});
  const { userInfo, setToken } = useContext(usersContext);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userInfo.userId}`)
      .then((result) => {
        console.log(result.data.user);
        setProfileUser(result.data.user);
        setFollower(result.data.user.followers);
        setFollowing(result.data.user.following);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div className="profileBg">
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-dark homeNav "
        style={{ backgroundColor: "#1b5acf" }}
      >
        <div className="row container-fluid">
          <div className="col">
            <div className="title">Sky</div>
          </div>

          <div className="col">
            {" "}
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
                style={{cursor:"pointer"}}
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
      {/* ========== Profile Heading ========= */}
      <div className="mt-2">
        <div>
          {" "}
          <img
            src={profileUser.coverImage}
            className="img-fluid position-relative"
            style={{ height: "60vh", width: "100%" }}
          />
        </div>
        <div>
          <img
            className="position-absolute end-50"
            src={profileUser.profileImage}
            style={{ borderRadius: "50%", height: "90px", width: "90px" }}
          />
        </div>

        <div className="row mt-3">
          <div className="col-2"></div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <div /* style={{textAlign:"center"}} */>{follower.length}</div>
            <div /* style={{textAlign:"center"}} */>Followers</div>
          </div>

          <div className="col-1" style={{ textAlign: "center" }}>
            <div>{following.length}</div>
            <div>Followings</div>
          </div>
        </div>

        <div className="" style={{ textAlign: "center" }}>
          {profileUser.firstName} {profileUser.lastName}
        </div>
      </div>

      {/* ====== Profile Body ============ */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-4 ms-2 me-2 bg-dark">L</div>
          <div className="col me-2 bg-primary">I</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
