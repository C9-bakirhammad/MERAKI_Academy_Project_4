import React, { useContext, useState } from "react";
import { usersContext } from "../../../App";
import "../Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostsPart";
import { Button, Modal } from "react-bootstrap";

const PublishPost = () => {
  const { userInfo, token, setToken } = useContext(usersContext);
  const { homePosts, setHomePosts } = useContext(postContext);
  const [postText, setPostText] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();

  const [postImage, setPostImage] = useState("");
  const [show, setShow] = useState(false);

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
    <div className="row border border-secondary bg-white">
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
            rows="3"
            placeholder={`What you think about ${userInfo.firstName}`}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></textarea>
        </div>
        <div></div>
      </div>

      <div className="row border-top">
        <div className=" col ms-3 mt-2 mb-2">
          <Button
            variant="btn btn-outline-warning"
            onClick={() => {
              setShow(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
            </svg>
          </Button>
        </div>
        <div className="col mt-2 mb-2" style={{ textAlign: "end" }}>
          <Button
            onClick={() => {
              axios
                .post(
                  "https://sky-hcfs.onrender.com/posts/createPost",
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
                  setPostImage("");
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

      <>
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
            setIsLoader(true);
            setIsUpload(false);
          }}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type="file"
                className="border"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setIsUpload(true);
                }}
              ></input>
              <div>
                {isUpload && (
                  <button
                    className="uploadBottom"
                    onClick={() => {
                      uploadImage();
                      setIsLoader(false);
                    }}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </Modal.Body>

          {isLoader ? (
            <></>
          ) : postImage ? (
            <Modal.Footer>
              <Button
                onClick={() => {
                  setShow(false);
                  setIsUpload(false);
                  setIsLoader(true);
                }}
              >
                Done
              </Button>
            </Modal.Footer>
          ) : (
            <div className="loaderHome"></div>
          )}
        </Modal>
      </>
    </div>
  );
};

export default PublishPost;
