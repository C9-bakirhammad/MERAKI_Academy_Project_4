import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Message from "./Message";
import SocketInit from "./SocketInit";
import { usersContext } from "../../App";
import axios from "axios";
import "./MsgComp.css";
import { IoSearch } from "react-icons/io5";

function SocketApp() {
  const { token, userInfo } = useContext(usersContext);
  const [socket, setSocket] = useState(null);
  const [isConnected, setisConnected] = useState(true);
  const [myFriends, setMyFriends] = useState([]);
  const [to, setTo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [friendInfos, setFriendInfos] = useState({});
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
      .get(`https://sky-pwcy.onrender.com/users/${userId}`)
      .then((result) => {
        setMyFriends(result.data.user.following);
        // console.log(result.data.user.following);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* --------------------------------- */
  return (
    <div className="container mt-3">
      {/* ------- Left Side ----- */}

      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-4 me-3 userbg bodyLeftSideChat">
          {/*======== search part of left side ======= */}
          <div className="col chatSearch">
            {" "}
            <input
              className="chatSearchInput"
              placeholder=" Search"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
            />
            <IoSearch
              className="col chatSearchIcon"
              style={{ cursor: "pointer" }}
              size={40}
              onClick={(e) => {
                axios
                  .get(
                    `https://sky-pwcy.onrender.com/users/find/${searchValue}`
                  )
                  .then((result) => {
                    setSearchResult(result.data.users);
                  })
                  .catch((err) => {
                    console.log(err.response.data.message);
                  });
              }}
            />
          </div>

          {/*======== friend list of left side ======= */}
          {myFriends.map((friend, i) => {
            return (
              <div
                key={i}
                id={friend._id}
                className="ChatLeftSide"
                onClick={() => {
                  setSocket(SocketInit({ userId, token }));
                  setTo(friend._id);

                  axios
                    .get(
                      `https://sky-pwcy.onrender.com/users/user/${friend._id}`
                    )
                    .then((result) => {
                      // console.log(result.data.user);
                      setFriendInfos(result.data.user);
                    })
                    .catch((err) => {
                      console.log(err.response.data);
                    });
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
        <div className="col-6 homePostP bodyRighttSideChat">
          {isConnected && (
            <Message
              socket={socket}
              toId={to}
              userId={userId}
              friendInfos={friendInfos}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SocketApp;
