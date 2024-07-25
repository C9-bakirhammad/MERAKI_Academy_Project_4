import React from "react";
import io from "socket.io-client";
import { usersContext } from "../../App";

const SocketInit = ({ userId, token }) => {
  /*   const { token, userInfo } = useContext(usersContext);
const userId = userInfo.userId */

  return io("https://sky-pwcy.onrender.com/", {
    extraHeaders: { userId, token },
    // autoConnect: false,
  });
};

export default SocketInit;
