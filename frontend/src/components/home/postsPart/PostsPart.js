import React, { createContext, useContext, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import PublishPost from "./PublishPost";
import Posts from "./Posts";
export const postContext = createContext();

const PostsPart = () => {
  const { userInfo } = useContext(usersContext);
const [publPost , setPublPost ] = useState(0)

  return (
    <postContext.Provider value={{publPost,setPublPost}}>
    <div>
      <div>
        <PublishPost/>
      </div>

      <div>
        <Posts/>
      </div>
    </div>
    </postContext.Provider>
  );
};

export default PostsPart;
