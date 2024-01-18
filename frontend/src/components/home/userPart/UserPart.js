import React, { useContext, useEffect, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPart = () => {
  const { userInfo } = useContext(usersContext);
  const [suggeted, setSuggeted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/search/${userInfo.country}`)
      .then((result) => {
        setSuggeted(result.data.users);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div>
      <div className="row bg-white rounded border">
        <div className="col mt-2 mb-2">
          <img
            src={userInfo.profileImage}
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
            {/* ====== Save Post Icon ======  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-bookmark-fill pionter me-2"
              viewBox="0 0 16 16"
            >
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
            </svg>
            <span>Saved Posts</span> <span>(0)</span>
          </div>
        </div>

        <div>
          <div className="col mb-2">
            {/* ====== Save Post Icon ======  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-p-square-fill me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8.27 8.074c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5z" />
            </svg>
            <span>My Pages</span> <span>(0)</span>
          </div>
        </div>

        <div>
          <div className="col mb-2">
            {/* ====== Save Post Icon ======  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-diagram-3-fill me-2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z"
              />
            </svg>
            <span>Groups</span> <span>(0)</span>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPart;
