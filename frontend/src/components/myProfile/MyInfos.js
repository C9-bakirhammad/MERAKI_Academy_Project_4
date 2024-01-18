import React, { useContext, useState } from "react";
import { profileContext } from "./MyProfile";

const MyInfos = () => {
  const { profileUser } = useContext(profileContext);
  return (
    <div className="col">
      <div className="bg-white border rounded font mb-2">
        <div className="ms-2 mt-2 mb-2">My Infos</div>
      </div>

      <div className="bg-white border rounded">
        <div className="ms-3 mt-2 border-bottom font">
          {" "}
          <p>
            {" "}
            <span>Country:</span>
            <span>
              {" "}
              {profileUser.country && profileUser.country.toUpperCase()}
            </span>{" "}
          </p>
        </div>
        <div className="ms-3 mt-2 border-bottom font">
          <p className="font">
            <span>Birth Date:</span>{" "}
            <span>
              {profileUser.birthDate &&
                profileUser.birthDate
                  .split("T")
                  .shift()
                  .split("-")
                  .reverse()
                  .join(".")}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white border rounded font mt-4 mb-2">
        <div className="ms-2 mt-2 mb-2">My Photos</div>
      </div>

      <div className="row border-bottom">
        <div className="col-3">
          <img
            className="ms-1 mb-1"
            src={profileUser.profileImage}
            width={90}
            height={90}
            style={{ borderRadius: "13px" }}
          />
        </div>
        <div className="col-3">
          <img
            className="ms-1"
            src={profileUser.coverImage}
            width={90}
            height={90}
            style={{ borderRadius: "13px" }}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MyInfos;
