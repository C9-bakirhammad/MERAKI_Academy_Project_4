import React, { createContext, useContext, useEffect, useState } from "react";
import { usersContext } from "../../../App";
import { postContext } from "./PostsPart";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../Home.css";
import { useNavigate } from "react-router-dom";
import { AiTwotoneLike } from "react-icons/ai";

const Posts = () => {
  const { userInfo, token } = useContext(usersContext);
  const { homePosts, setHomePosts } = useContext(postContext);
  const [isComment, setIsComment] = useState(false);
  const [postClickId, setPostClickId] = useState("");
  const [comment, setComment] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://sky-hcfs.onrender.com/users/user/${userInfo.userId}`)
      .then((result) => {
        // console.log(result.data.user);
        setLikedPosts(result.data.user.likedPosts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get("https://sky-hcfs.onrender.com/posts/authors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setHomePosts(result.data.posts);
        // console.log(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div>
      {homePosts.length === 0 ? (
        <div
          className="row"
          style={{
            backgroundColor: "white",
            textAlign: "center",
            height: "30vh",
            alignItems: "center",
          }}
        >
          <div>No post yet</div>{" "}
        </div>
      ) : (
        <>
          {homePosts.map((elem, i) => {
            return (
              <div
                key={elem._id}
                className="row bg-white mb-3 border homePosts"
              >
                <div>
                  <div
                    className="row align-items-center"
                    style={{ height: "60px" }}
                  >
                    {/* ========= Top part of Post Form ========= */}
                    <div className="col mt-2 mb-1">
                      <img
                        id={elem.author._id}
                        src={elem.author.profileImage}
                        alt="profileImage"
                        width={50}
                        height={50}
                        className="rounded-circle border"
                      />
                      <span
                        className="ms-2 position-relative pionter"
                        id={elem.author._id}
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "19px",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          elem.author._id === userInfo.userId
                            ? navigate("/profile")
                            : navigate(`/friend/${elem.author._id}`);
                        }}
                      >
                        {elem.author.firstName} {elem.author.lastName}
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
                    {userInfo.userId !== elem.author._id && (
                      <div className="col-1">
                        {/* ====== Save Post Icon ======  */}
                        <svg
                          id={elem._id}
                          // style={{ color: "#0D6EFD" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-bookmark-fill pionter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* ========= Main (Body) part of Post Form ========= */}

                {isComment && postClickId === elem._id ? (
                  <div className="mt-2">
                    <div className=" col ms-2">
                      <div
                        className=""
                        style={{
                          overflowWrap: "break-word",
                          fontFamily: "inherit",
                          fontSize: "20px",
                          fontWeight: "450",
                        }}
                      >
                        {elem.postText}
                      </div>
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
                                  className="mt-1 pionter"
                                  id={comment.commenter._id}
                                  style={{
                                    fontFamily: "inherit",
                                    fontSize: "17px",
                                    fontWeight: "700",
                                  }}
                                  onClick={() => {
                                    {
                                      comment.commenter._id === userInfo.userId
                                        ? navigate("/profile")
                                        : navigate(
                                            `/friend/${comment.commenter._id}`
                                          );
                                    }
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
                                `https://sky-hcfs.onrender.com/comments/post/${elem._id}`,
                                { comment },
                                {
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              )
                              .then((result) => {
                                let newComment = homePosts.map((element, i) => {
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
                                setHomePosts(newComment);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          className="col-2"
                          variant="btn btn-outline-dark"
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
                        <p
                          style={{
                            overflowWrap: "break-word",
                            fontFamily: "inherit",
                            fontSize: "20px",
                            fontWeight: "450",
                          }}
                        >
                          {elem.postText}
                        </p>
                      </div>
                      <div className="col">
                        {elem.postImage !== undefined &&
                          elem.postImage !== "" && (
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
                            {elem.likes.length === 1 ? (
                              <>{elem.likes.length}.Like</>
                            ) : (
                              <>{elem.likes.length}.Likes</>
                            )}
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
                          <AiTwotoneLike
                            id={elem._id}
                            size={28}
                            style={
                              likedPosts.includes(elem._id)
                                ? { color: "blue" }
                                : { color: "black" }
                            }
                            className="bi bi-hand-thumbs-up pionter"
                            onClick={(e) => {
                              {
                                likedPosts.includes(elem._id)
                                  ? axios
                                      .get(
                                        `https://sky-hcfs.onrender.com/posts/${elem._id}/likes/remove`,
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((result) => {
                                        let newHomePosts = homePosts.map(
                                          (element, i) => {
                                            if (element._id === elem._id) {
                                              let indexPost =
                                                element.likes.indexOf(
                                                  userInfo.userId
                                                );
                                              element.likes.splice(
                                                indexPost,
                                                1
                                              );

                                              let indexUser =
                                                likedPosts.indexOf(element._id);
                                              likedPosts.splice(indexUser, 1);
                                            }
                                            return element;
                                          }
                                        );
                                        setHomePosts(newHomePosts);
                                      })
                                      .catch((err) => {
                                        console.log(err.response.data);
                                      })
                                  : axios
                                      .get(
                                        `https://sky-hcfs.onrender.com/posts/${elem._id}/likes`,
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((result) => {
                                        let newHomePosts = homePosts.map(
                                          (element, i) => {
                                            if (element._id === elem._id) {
                                              element.likes.push(
                                                userInfo.userId
                                              );
                                              setLikedPosts([
                                                element._id,
                                                ...likedPosts,
                                              ]);
                                            }
                                            return element;
                                          }
                                        );
                                        setHomePosts(newHomePosts);
                                      })
                                      .catch((err) => {
                                        console.log(err.response.data);
                                      });
                              }
                            }}
                          />
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
                      </div>
                    </div>{" "}
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Posts;
