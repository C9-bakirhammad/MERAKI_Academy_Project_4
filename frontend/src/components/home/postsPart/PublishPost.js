import React, { useContext, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostsPart";

const PublishPost = () => {
  const { userInfo, token, setToken, postImage, setPostImage } =
    useContext(usersContext);
  const { homePosts, setHomePosts } = useContext(postContext);
  const [postText, setPostText] = useState("");
  const [isUpload, setIsUpload] = useState(true);
  const navigate = useNavigate();

  const [image, setImage] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "szb3g9r3");
    data.append("cloud_name", "drkox9efz");
    fetch("https://api.cloudinary.com/v1_1/drkox9efz/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPostImage(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

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
            placeholder={`What you think about ${userInfo.firstName}`}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></textarea>
        </div>
        <div></div>
      </div>

      <div>
        <div>
          <img src={postImage} height={400} width={600} />
        </div>

        <div>
          <button onClick={uploadImage}>Upload</button>

          <input
            type="file"
            className="border"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
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
                  const newPost = {
                    _id: result.data.post._id,
                    likes: result.data.post.likes,
                    comments: result.data.post.comments,
                    postDate: result.data.post.postDate,
                    postImage: result.data.post.postImage,
                    postText: result.data.post.postText,
                    author: {
                      _id: result.data.post.author,
                      firstName: userInfo.firstName,
                      lastName: userInfo.lastName,
                      profileImage: userInfo.profileImage,
                    },
                  };
                  setHomePosts([newPost, ...homePosts]);
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
            Post now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishPost;
