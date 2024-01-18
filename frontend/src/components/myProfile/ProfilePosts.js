import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { usersContext } from "../../App";
import "../myProfile/MyProfile.css";
import { profileContext } from "./MyProfile";
import { Button } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";

const ProfilePosts = () => {
  const { userInfo, token } = useContext(usersContext);
  const { likedPosts, setLikedPosts, profileUser } = useContext(profileContext);
  const [profilePosts, setProfilePosts] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [postClickId, setPostClickId] = useState("");
  const [comment, setComment] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [postText, setPostText] = useState("");
  const [postUpdateId, setPostUpdateId] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${userInfo.userId}/posts`)
      .then((result) => {
        setProfilePosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div>
      {profilePosts.map((elem, i) => {
        return (
          <div key={elem._id} className="row bg-white mb-2 rounded border">
            <div>
              <div
                className="row align-items-center"
                style={{ height: "60px" }}
              >
                {/* ========= Top part of Post Form ========= */}
                <div className="col mt-2 mb-1">
                  <img
                    id={elem.author._id}
                    src={profileUser.profileImage}
                    alt="profileImage"
                    width={50}
                    height={50}
                    className="rounded-circle border"
                  />
                  <span
                    className="ms-2 position-relative"
                    id={elem.author._id}
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: "19px",
                      fontWeight: "bold",
                    }}
                  >
                    {profileUser.firstName} {profileUser.lastName}
                    <span
                      style={{ fontSize: "13px", color: "#999EBA" }}
                      className="position-absolute top-100 start-0 translate-middle-y mt-2"
                    >
                      {elem.postDate
                        .split("T")
                        .shift()
                        .split("-")
                        .reverse()
                        .join(".")}
                    </span>
                  </span>
                </div>

                <div className="col-2" style={{ textAlign: "end" }}>
                  <DropdownButton
                    className=""
                    id={elem._id}
                    title=""
                    variant=""
                    size="sm"
                  >
                    <Dropdown.Item
                      id={elem._id}
                      onClick={(e) => {
                        axios
                          .delete(`http://localhost:5000/posts/${elem._id}`)
                          .then((result) => {
                            let newDeletePosts = profilePosts.filter(
                              (element, i) => {
                                if (element._id === elem._id) {
                                  return element._id !== elem._id;
                                }
                                return element;
                              }
                            );
                            setProfilePosts(newDeletePosts);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={elem._id}
                      onClick={(e) => {
                        setPostUpdateId(e.target.id);
                        setIsUpdate(!isUpdate);
                        setIsComment(!isComment);
                      }}
                    >
                      Update
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>

            {/* ========= Main (Body) part of Post Form ========= */}
            {isComment && postClickId === elem._id ? (
              <div className="mt-2">
                <div className="col ms-2">
                  <p
                    style={{
                      fontFamily: "inherit",
                      fontSize: "20px",
                      fontWeight: "450",
                    }}
                  >
                    {elem.postText}
                  </p>
                </div>
                <div>
                  <div className="col mb-2 border-top">
                    {elem.comments.map((comment, i) => {
                      return (
                        <div className="row mt-2" key={i}>
                          <div
                            className="col-2 mt-1"
                            style={{ textAlign: "end" }}
                            id={comment.commenter._id}
                          >
                            {" "}
                            <img
                              src={comment.commenter.profileImage}
                              height={42}
                              width={42}
                              style={{ borderRadius: "50%" }}
                            />
                          </div>
                          <span
                            className="col-9 mb-1"
                            style={{
                              backgroundColor: "#e7e7e7",
                              borderRadius: "30px",
                            }}
                          >
                            {" "}
                            <div
                              className="mt-1"
                              id={comment.commenter._id}
                              style={{
                                fontFamily: "inherit",
                                fontSize: "17px",
                                fontWeight: "700",
                              }}
                            >
                              {comment.commenter.firstName}{" "}
                              {comment.commenter.lastName}
                            </div>
                            <div
                              className="ms-3"
                              style={{
                                fontFamily: "cursive",
                                fontSize: "17px",
                              }}
                            >
                              {comment.comment}
                            </div>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="col mt-3">
                    {" "}
                    <textarea
                      style={{ borderRadius: "20px" }}
                      type="text"
                      className="textarea w-100"
                      placeholder="Add comment"
                      rows={1}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div
                    className="row mb-2"
                    style={{ justifyContent: "center" }}
                  >
                    <Button
                      id={elem._id}
                      className="col-2 me-1"
                      style={{ borderRadius: "20px" }}
                      onClick={(e) => {
                        axios
                          .post(
                            `http://localhost:5000/comments/post/${elem._id}`,
                            { comment },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then((result) => {
                            let newComment = profilePosts.map((element, i) => {
                              if (element._id === elem._id) {
                                element.comments.push({
                                  comment: comment,
                                  commenter: {
                                    firstName: userInfo.firstName,
                                    lastName: userInfo.lastName,
                                    profileImage: userInfo.profileImage,
                                    _id: userInfo.userId,
                                  },
                                });
                              }
                              return element;
                            });
                            setProfilePosts(newComment);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Add
                    </Button>

                    <Button
                      className="col-2 btn btn-sm btn-outline-dark"
                      variant="btn-outline-dark"
                      style={{ borderRadius: "20px" }}
                      onClick={() => {
                        setPostClickId("");
                        setIsComment(!isComment);
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-2">
                  <div className="col ms-2">
                    {isUpdate && postUpdateId === elem._id ? (
                      <div className="row">
                        <div className="row mt-2">
                          <textarea
                            className="updataArea"
                            rows={3}
                            defaultValue={elem.postText}
                            onChange={(e) => {
                              setPostText(e.target.value);
                            }}
                          ></textarea>
                        </div>
                        <div className="row w-50 mb-3 mt-2">
                          <Button
                            id={elem._id}
                            className="col me-2 btn btn-sm btn-outline-primary"
                            variant="btn-outline-primary"
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              axios
                                .put(
                                  `http://localhost:5000/posts/${elem._id}`,
                                  {
                                    postText,
                                  }
                                )
                                .then((result) => {
                                  let newUpdate = profilePosts.map(
                                    (element, i) => {
                                      if (element._id === elem._id) {
                                        element.postText = postText;
                                      }
                                      return element;
                                    }
                                  );
                                  setProfilePosts(newUpdate);
                                  setIsUpdate(!isUpdate);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            className="col btn btn-sm btn-outline-dark"
                            variant=""
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              setIsUpdate(!isUpdate);
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p
                        style={{
                          fontFamily: "inherit",
                          fontSize: "20px",
                          fontWeight: "450",
                        }}
                      >
                        {elem.postText}
                      </p>
                    )}
                  </div>
                  <div className="col">
                    {elem.postImage !== undefined && elem.postImage !== "" && (
                      <img
                        src={elem.postImage}
                        height={400}
                        className="w-100 mb-1"
                        key={i}
                      />
                    )}
                  </div>
                  <div className="col" style={{ textAlign: "end" }}>
                    {" "}
                    {elem.likes.length !== 0 && (
                      <span style={{ fontSize: "14px", color: "GrayText" }}>
                        {elem.likes.length}.likes
                      </span>
                    )}
                    <span> </span>
                    {elem.comments.length !== 0 && (
                      <span style={{ fontSize: "14px", color: "GrayText" }}>
                        {elem.comments.length}.comment
                      </span>
                    )}
                  </div>
                </div>

                {/* ========= Bottom part of Post Form ========= */}
                <div>
                  <div
                    className="row align-items-center border-top mb-1"
                    style={{ textAlign: "center", height: "38px" }}
                  >
                    <div className="col">
                      {/* ======= Like Icon ========= */}
                      <svg
                        id={elem._id}
                        style={
                          likedPosts.includes(elem._id)
                            ? { color: "blue" }
                            : { color: "black" }
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-hand-thumbs-up pionter"
                        viewBox="0 0 16 16"
                        onClick={(e) => {
                          {
                            likedPosts.includes(elem._id)
                              ? axios
                                  .get(
                                    `http://localhost:5000/posts/${elem._id}/likes/remove`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((result) => {
                                    let newHomePosts = profilePosts.map(
                                      (element, i) => {
                                        if (element._id === elem._id) {
                                          let indexPost = element.likes.indexOf(
                                            userInfo.userId
                                          );
                                          element.likes.splice(indexPost, 1);

                                          let indexUser = likedPosts.indexOf(
                                            element._id
                                          );
                                          likedPosts.splice(indexUser, 1);
                                        }
                                        return element;
                                      }
                                    );
                                    setProfilePosts(newHomePosts);
                                  })
                                  .catch((err) => {
                                    console.log(err.response.data);
                                  })
                              : axios
                                  .get(
                                    `http://localhost:5000/posts/${elem._id}/likes`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((result) => {
                                    let newHomePosts = profilePosts.map(
                                      (element, i) => {
                                        if (element._id === elem._id) {
                                          element.likes.push(userInfo.userId);
                                          setLikedPosts([
                                            element._id,
                                            ...likedPosts,
                                          ]);
                                        }
                                        return element;
                                      }
                                    );
                                    setProfilePosts(newHomePosts);
                                  })
                                  .catch((err) => {
                                    console.log(err.response.data);
                                  });
                          }
                        }}
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                    </div>

                    <div className="col">
                      {/* ======= comment Icon ========= */}
                      <svg
                        id={elem._id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-chat-dots pionter"
                        viewBox="0 0 16 16"
                        onClick={(e) => {
                          setPostClickId(elem._id);
                          setIsComment(true);
                        }}
                      >
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                      </svg>
                    </div>

                    <div className="col">
                      {/* ======= share Icon ========= */}
                      <svg
                        id={elem._id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-reply-all pionter"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM9.3 10.386q.102 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z" />
                        <path d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028 4.012-2.954a.5.5 0 0 0 .106-.699" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
