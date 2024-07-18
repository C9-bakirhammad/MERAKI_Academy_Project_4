import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Message from "./Message";
import SocketInit from "./SocketInit";
import { usersContext } from "../../App";
import axios from "axios";
import "./MsgComp.css";

function SocketApp() {
  const { token, userInfo } = useContext(usersContext);
  const [socket, setSocket] = useState(null);
  const [isConnected, setisConnected] = useState(false);
  const [myFriends, setMyFriends] = useState([]);
  const [to, setTo] = useState("");
  const userId = userInfo.userId;

  useEffect(() => {
    //mount starts with body
    socket?.on("connect", () => {
      console.log("conected");
      setisConnected(!isConnected);
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
    });
    return () => {
      socket?.close();
      setisConnected(!isConnected);

      socket?.removeAllListeners();
      console.log("closed");
    };
    //unmount starts with return function so we have to make eveything in body bel3aks
    // update return then body
  }, [socket]);

  /* ------------- */
  useEffect(() => {
    axios
      .get(`https://sky-hcfs.onrender.com/info/${userId}`)
      .then((result) => {
        setMyFriends(result.data.result.following);
        console.log(result.data.result.following);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* --------------------------------- */
  return (
    <div className="container mt-4">
      {/* ------- Left Side ----- */}
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-4 me-3 userbg " style={{ backgroundColor: "red" }}>
          {/*     <button
            onClick={() => {
              setSocket(SocketInit({ userId, token }));
            }}
          >
            connect
          </button> */}
          {myFriends.map((friend, i) => {
            return (
              <div
                key={i}
                id={friend._id}
                className="ChatLeftSide"
                onClick={() => {
                  setSocket(SocketInit({ userId, token }));
                  setTo(friend._id);
                }}
              >
                <img
                  alt="progileImage"
                  className="chatFriendImge"
                  src={friend.profileImage}
                />
                <span className="chatFriendName">
                  {friend.firstName} {friend.lastName}
                </span>
              </div>
            );
          })}
        </div>

        {/* -------- Right Side --------- */}
        <div className="col-6 homePostP" style={{ backgroundColor: "red" }}>
          {isConnected && <Message socket={socket} toId={to} userId={userId} />}
        </div>
      </div>
    </div>
  );
}

export default SocketApp;
