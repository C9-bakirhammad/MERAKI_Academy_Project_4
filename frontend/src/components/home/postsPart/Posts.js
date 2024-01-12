import React, { useContext, useEffect } from "react";
import { usersContext } from "../../../App";
import { postContext } from "./PostsPart";
import axios from "axios";

const Posts = () => {
  const { userInfo } = useContext(usersContext);
  const { publPost } = useContext(postContext);

  useEffect(()=>{
axios.get("")
  }, [publPost])

  return (
  <div>



  </div>
  );
};

export default Posts;
