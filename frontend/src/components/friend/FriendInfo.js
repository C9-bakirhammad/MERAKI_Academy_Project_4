import React, { useContext } from "react";
import { friendContext } from "./FriendProfile";

const FriendInfo = () => {
  const { friendInfo } = useContext(friendContext);
  return (
    <div className="col">
      <div className="bg-white border rounded font mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-person-lines-fill me-2 ms-2 mt-2 mb-2"
          viewBox="0 0 16 16"
        >
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
        </svg>
        <span className="">About</span>
      </div>

      {/* ============= Main Info =========== */}
      <div className="bg-white border rounded">
        <div className="ms-3 mt-2 border-bottom font">
          {" "}
          <p>
            {" "}
            <span>Country:</span>
            <span>
              {" "}
              {friendInfo.country &&
                friendInfo.country.replace(
                  friendInfo.country[0],
                  friendInfo.country[0].toUpperCase()
                )}
            </span>{" "}
          </p>
        </div>
        <div className="ms-3 mt-2 border-bottom font">
          <p className="font">
            <span>Birth Date:</span>{" "}
            <span>
              {
                friendInfo.birthDate &&
                  friendInfo.birthDate.split(" ").slice(1, 4).join(".")
                /*   .split("T")
                  .shift()
                  .split("-")
                  .reverse()
                  .join(".") */
              }
            </span>
          </p>
        </div>
      </div>

      {/* ============== photo list ====================== */}
      <div className="bg-white border rounded font mt-4 mb-2">
        <div className="ms-2 mt-2 mb-2">{friendInfo.firstName}'s photos</div>
      </div>

      <div className="row border-bottom">
        <div className="col-3">
          <img
            className="ms-1 mb-1"
            src={friendInfo.profileImage}
            width={90}
            height={90}
            style={{ borderRadius: "13px" }}
          />
        </div>
        <div className="col-3">
          <img
            className="ms-1"
            src={friendInfo.coverImage}
            width={90}
            height={90}
            style={{ borderRadius: "13px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendInfo;
