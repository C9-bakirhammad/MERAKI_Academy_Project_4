import React, { useContext, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostsPart";
import UploadImg from "../../UploadImg";

const PublishPost = () => {
  const { userInfo, token, setToken, postImage, setPostImage } =
    useContext(usersContext);
  const { homePosts, setHomePosts } = useContext(postContext);
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  return (
    <div className="row border bg-white rounded">
      <div>
        <div className="row" style={{ height: "40px" }}>
          <div className="col" style={{ textAlign: "center" }}>
            Publish
          </div>
          <div
            className="col border-bottom"
            style={{ background: "#F4F4F4" }}
          ></div>
        </div>
      </div>

      <div>
        <div className="col">
          <textarea
            className="textarea border-0 w-100 p-2"
            rows="5"
            placeholder={`What you think ${userInfo.firstName}`}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></textarea>
        </div>
        <div><UploadImg/></div>
      </div>

      <div className="border-top">
        <div className="mt-2 mb-2">
          <Button
            onClick={() => {
              axios
                .post(
                  "http://localhost:5000/posts/createPost",
                  { postText, postImage },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((result) => {
                  setHomePosts([result.data.post, ...homePosts]);
                })
                .catch((err) => {
                  if (
                    err.response.data.message ===
                    "The token is invalid or expired"
                  ) {
                    localStorage.clear();
                    setToken("");
                    navigate("/login");
                  }
                });
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishPost;
