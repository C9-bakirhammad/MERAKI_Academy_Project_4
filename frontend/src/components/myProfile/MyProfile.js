import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../myProfile/MyProfile.css";
import axios from "axios";
import { usersContext } from "../../App";
import ProfilePosts from "./ProfilePosts";
import UploadImg from "../UploadImg";
export const profileContext = createContext()

const MyProfile = () => {
  const [profileUser, setProfileUser] = useState({});
  const { userInfo, setToken } = useContext(usersContext);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userInfo.userId}`)
      .then((result) => {
        console.log(result.data.user);
        setProfileUser(result.data.user);
        setFollower(result.data.user.followers);
        setFollowing(result.data.user.following);
        setLikedPosts(result.data.user.likedPosts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <profileContext.Provider value={{likedPosts,setLikedPosts}}>
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
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
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
        <div style={{ position: "relative" }}>
          {" "}
          <img
            src={profileUser.coverImage}
            style={{ height: "60vh", width: "100%" }}
          />
        </div>
        <div style={{ position: "absolute", top: "66%", left: "47%" }}>
          <img
            src={profileUser.profileImage}
            className="mb-1"
            style={{
              borderRadius: "50%",
              height: "90px",
              width: "90px",
              boxShadow: "1px 1px 7px",
            }}
          />
          <div>
            {profileUser.firstName} {profileUser.lastName}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-2"></div>
          <div className="col-1 font" style={{ textAlign: "center" }}>
            <div>{follower.length}</div>
            <div>Followers</div>
          </div>

          <div className="col-1 font" style={{ textAlign: "center" }}>
            <div>{following.length}</div>
            <div>Followings</div>
          </div>
        </div>
      </div>

      {/* ====== Profile Body ============ */}
      <UploadImg/>
      <div className="container mt-3">
        <div className="row">
          <div className="col-5 ms-2 me-2 bg-dark">L</div>
          <div className="col me-2">
            <ProfilePosts />{" "}
          </div>
        </div>
      </div>
    </div>
    </profileContext.Provider>
  );
};

export default MyProfile;
