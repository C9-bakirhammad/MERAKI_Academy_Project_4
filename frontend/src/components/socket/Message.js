import axios from "axios";
import React, { useState, useEffect } from "react";
import "./MsgComp.css";

const Message = ({ socket, toId, userId, friendInfos }) => {
  const [msg, setMsg] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [reply, setReply] = useState();

  useEffect(() => {
    //mount starts with body
    socket?.on("message", (data) => {
      console.log("data", data);
      setMsg([...msg, data]);
    });
    return () => {
      socket?.off("message", () => {
        socket?.on("message", (data) => {
          console.log("data", data);
          setMsg([...msg, data]);
        });
      });
    };
  }, [msg]);

  // console.log(friendInfos);
  return (
    <div className="container">
      <header className="chatHeader">
        <img
          alt="friendImage"
          src={friendInfos.profileImage}
          className="chatHeaderImage"
        />
        <p className="chatHeaderName">
          {friendInfos.firstName} {friendInfos.lastName}
        </p>
      </header>

      <main>
        {msg &&
          msg.map((msg, i) => {
            return (
              <>
                {(msg.from === toId || msg.to === toId) && (
                  <div key={i}>
                    <div className="messageCont space-y-4">
                      {msg.from === userId ? (
                        <div className="messageRight">
                          <p className="myMessage">{msg.reply}</p>
                        </div>
                      ) : (
                        <div className="messageLeft">
                          <div className="flex-shrink-0">
                            <img
                              className="friendMessageImage"
                              src={friendInfos.profileImage}
                              alt="pic"
                            />
                          </div>
                          <p className="friedMessage">{msg.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </main>

      <footer>
        <input
          id="reply"
          type="text"
          placeholder="reply"
          onChange={(e) => {
            setReply(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            socket.emit("message", { reply, from: userId, to: toId });

            document.getElementById("reply").value = "";
          }}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Message;
