import React, { useContext, useEffect, useState } from "react";
import { usersContext } from "../../App";
import axios from "axios";
import { useParams } from "react-router-dom";

const FriendPosts = () => {
  const { id } = useParams();
  const [friendPosts, setFriendPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://sky-hcfs.onrender.com/posts/${id}/posts`)
      .then((result) => {
        setFriendPosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <div className="friendPost">
      {friendPosts.length === 0 ? (
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
          {friendPosts.map((elem, i) => {
            return (
              <div key={elem._id} className="row bg-white mb-2 border friendPost">
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
                        className="ms-2 position-relative"
                        id={elem.author._id}
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "19px",
                          fontWeight: "bold",
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
                  </div>
                </div>

                {/* ========= Main (Body) part of Post Form ========= */}
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
{/* 

                ========= Bottom part of Post Form ========= 
                <div>
                  <div
                    className="row align-items-center border-top mb-1"
                    style={{ textAlign: "center", height: "38px" }}
                  >
                    <div className="col">
                       ======= Like Icon ========= 
                      <svg
                        id={elem._id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-hand-thumbs-up pionter"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                    </div>

                    <div className="col">
                       ======= comment Icon ========= 
                      <svg
                        id={elem._id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-chat-dots pionter"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                      </svg>
                    </div>
                  </div>
                </div>
                 */}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FriendPosts;
