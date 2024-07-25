import React, { useContext, useEffect, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPart = () => {
  const { userInfo } = useContext(usersContext);
  const [suggeted, setSuggeted] = useState([]);
  const [profileUser, setProfileUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://sky-pwcy.onrender.com/users/search/${userInfo.country}`)
      .then((result) => {
        setSuggeted(result.data.users);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get(`https://sky-pwcy.onrender.com/users/user/${userInfo.userId}`)
      .then((result) => {
        // console.log(result.data.user);
        setProfileUser(result.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="row bg-white rounded border">
        <div className="col mt-2 mb-2">
          <img
            src={profileUser.profileImage}
            alt="profileImage"
            width={75}
            height={75}
            className="rounded-circle border mb-2"
          />
          <span className="h6 ms-2" style={{ fontFamily: "" }}>
            {userInfo.firstName} {userInfo.lastName}
          </span>
        </div>
      </div>

      <div className="row bg-white rounded border mt-3">
        <div>
          <div className="col mb-2 mt-2">
            {/* ====== Following ======  */}
            <span>Following </span>{" "}
            <span>
              {profileUser.following ? (
                <>({profileUser.following.length})</>
              ) : (
                <>(0)</>
              )}
            </span>
          </div>
        </div>

        <div>
          <div className="col mb-2">
            {/* ====== Followers ======  */}
            <span>My Followers</span>{" "}
            <span>
              {profileUser.following ? (
                <>({profileUser.followers.length})</>
              ) : (
                <>(0)</>
              )}
            </span>
          </div>
        </div>

        <div>
          <div className="col mb-2">
            {/* ====== liked Posts ======  */}
            <span>liked Posts</span>{" "}
            <span>
              {profileUser.following ? (
                <>({profileUser.likedPosts.length})</>
              ) : (
                <>(0)</>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="row bg-white rounded border mt-3">
        <div className="mt-2 mb-2">Suggested Friends</div>
      </div>

      <div className="mt-2 bg-white rounded border">
        {suggeted.map((friend, i) => {
          return (
            <div key={i} className="mt-2 mb-2 ms-2">
              {userInfo.userId !== friend._id && (
                <>
                  {" "}
                  <img
                    className="rounded-circle"
                    src={friend.profileImage}
                    height={50}
                    width={50}
                  />
                  <span
                    id={friend._id}
                    className="ms-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      {
                        friend._id === userInfo.userId
                          ? navigate("/profile")
                          : navigate(`/friend/${friend._id}`);
                      }
                    }}
                  >
                    {friend.firstName} {friend.lastName}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPart;
