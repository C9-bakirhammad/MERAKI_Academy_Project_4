import React, { useContext } from "react";
import { usersContext } from "../../../App";
import "../Home.css";

const UserPart = () => {
  const { userInfo } = useContext(usersContext);
  return (
    <div>
      <div className="row bg-white rounded border">
        <div className="col mt-2 mb-2">
          <img
            src={userInfo.profileImage}
            alt="profileImage"
            width={90}
            height={80}
            className="rounded-circle border"
          />
          <span className="h6 ms-2" style={{ fontFamily: "" }}>
            {userInfo.firstName} {userInfo.lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPart;
