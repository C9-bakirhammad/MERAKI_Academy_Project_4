import React, { createContext, useContext, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import PublishPost from "./PublishPost";
import Posts from "./Posts";
export const postContext = createContext();

const PostsPart = () => {
  const { userInfo } = useContext(usersContext);
  const [publPost, setPublPost] = useState(1);

  return (
    <postContext.Provider value={{ publPost, setPublPost }}>
      <div>
        <div className="mb-2">
          <PublishPost />
        </div>

        <div className="mt-3">
          <Posts />
        </div>
      </div>
    </postContext.Provider>
  );
};

export default PostsPart;
