import React from "react";
import io from "socket.io-client";
import { usersContext } from "../../App";

const SocketInit = ({ userId, token }) => {
  /*   const { token, userInfo } = useContext(usersContext);
const userId = userInfo.userId */

  return io("http://localhost:5000/", {
    extraHeaders: { userId, token },
    // autoConnect: false,
  });
};

export default SocketInit;
