import React, { useState, useEffect } from "react";

const Message = ({ socket, toId, userId }) => {
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
  return (
    <div>
      Mesaage
      {msg &&
        msg.map((msg) => (
          <>
            {" "}
            {msg.from === toId && (
              <div key={msg.message}>
                <p>
                  {msg.from}:{msg.message} {msg.reply}
                </p>
              </div>
            )}
          </>
        ))}
      <input
        type="text"
        placeholder="reply"
        onChange={(e) => {
          setReply(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket.emit("message", { reply, from: userId, to: toId });
        }}
      >
        reply
      </button>
    </div>
  );
};

export default Message;
