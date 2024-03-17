import React, { createContext, useContext, useEffect, useState } from "react";
import { usersContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FriendProfile.css";
import { Button } from "react-bootstrap";
import FriendInfo from "./FriendInfo";
import FriendPosts from "./FriendPosts";
import { useParams } from "react-router-dom";
export const friendContext = createContext()

const FriendProfile = () => {
  const {id} = useParams()
  const { userInfo,token } = useContext(usersContext);
  const [friendInfo, setFriendInfo] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);

  console.log(friendInfo);
  console.log(following);


  useEffect(() => {
    axios //For user
      .get(`https://sky-hcfs.onrender.com/users/user/${userInfo.userId}`)
      .then((result) => {
        setLikedPosts(result.data.user.likedPosts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios // for friend
      .get(`https://sky-hcfs.onrender.com/users/user/${id}`)
      .then((result) => {
        setFriendInfo(result.data.user);
        setFollower(result.data.user.followers);
        setFollowing(result.data.user.following);
      })
      .catch((err) => {
        console.log("from freind", err.response.data);
      });
  }, []);

  return (
    <friendContext.Provider value={{friendInfo}}>
    <div className="profileBg">
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

              <div className="col-3" style={{ textAlign: "start" }}>
                <Link className="nav-link active" to="/profile">
                  MyProfile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== Profile Heading ========= */}
      <div className="container" style={{ textAlign: "center" }}>
        <div style={{ position: "relative" }}>
          {" "}
          <img
            src={friendInfo.coverImage}
            style={{ height: "65vh", width: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "66%",
            left: "43%",
            textAlign: "center",
          }}
        >
          <img
            src={friendInfo.profileImage}
            className="mb-2"
            style={{
              borderRadius: "50%",
              height: "130px",
              width: "130px",
              boxShadow: "1px 1px 7px",
            }}
          />
          <div
            style={{
              fontFamily: "inherit",
              fontSize: "25px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {friendInfo.firstName} {friendInfo.lastName}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="row w-100">
          <div className="col-2"></div>

          <div className="col">
            {follower.includes(userInfo.userId) ? (
              <div>
                <Button
                  className="btn btn-dark"
                  onClick={() => {
                    axios
                      .get(`https://sky-hcfs.onrender.com/users/${id}/unFollow`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((result) => {
                        let newFollower = follower.filter((e, i) => {
                          return e !== userInfo.userId;
                        });
                        setFollower(newFollower);
                      })
                      .catch((err) => {
                        console.log(err.response.data);
                      });
                  }}
                >
                  UnFollow
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className="btn btn-dark"
                  style={{ width: "110px" }}
                  onClick={() => {
                    axios
                      .get(`https://sky-hcfs.onrender.com/users/follow/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((result) => {
                        setFollower([userInfo.userId, ...follower]);
                      })
                      .catch((err) => {
                        console.log(err.response.data);
                      });
                  }}
                >
                  Follow
                </Button>
              </div>
            )}
          </div>

          <div
            className="col-1 rounded-start border-top border-bottom border-end"
            style={{ textAlign: "center" }}
          >
            <div className="followNum">{follower.length}</div>
            <div className="followWord">Followers</div>
          </div>

          <div
            className="col-1 rounded-end  border-top border-end"
            style={{ textAlign: "center" }}
          >
            <div className="followNum">{following.length}</div>
            <div className="followWord">Following</div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>

      {/* ====== Profile Body ============ */}
      <div className="container mt-5">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-4 ms-2 me-2">
            <FriendInfo />
          </div>
          <div className="col-6 ms-2 me-2">
            <FriendPosts />
          </div>
        </div>
      </div>
    </div>
    </friendContext.Provider>
  );
};

export default FriendProfile;
