import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../myProfile/MyProfile.css";
import axios from "axios";
import { usersContext } from "../../App";
import ProfilePosts from "./ProfilePosts";
import UploadImg from "../UploadImg";
import { Dropdown, DropdownButton, Button, Modal } from "react-bootstrap";
import MyInfos from "./MyInfos";
import { IoSearch } from "react-icons/io5";
export const profileContext = createContext();


const MyProfile = () => {
  const [profileUser, setProfileUser] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);
  const { userInfo, token, setToken } = useContext(usersContext);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [followCkick, setFollowCkick] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState("");
  const [updateProfileClick, setUpdateProfileClick] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState("");
  const [isLoader, setIsLoader] = useState(true);
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [search, setSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://sky-hcfs.onrender.com/users/${userInfo.userId}`)
      .then((result) => {
        // console.log(result.data.user);
        setProfileUser(result.data.user);
        setFollower(result.data.user.followers);
        setFollowing(result.data.user.following);
        setLikedPosts(result.data.user.likedPosts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

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
        setUpdatePhoto(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <profileContext.Provider
      value={{
        profilePosts,
        setProfilePosts,
        profileUser,
        likedPosts,
        setLikedPosts,
        following,
      }}
    >
      <div className="profileBg">
        <nav
          className="navbar sticky-top navbar-expand-lg navbar-dark homeNav "
          style={{ backgroundColor: "#1b5acf" }}
        >
          <div className="row container-fluid">
            <div className="col">
              <div className="title">Sky</div>
            </div>

            <div className="col" style={{ textAlign: "center", color: "white"  }}>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </div>

                
                <div className="col" style={{ textAlign: "end", color: "white" }}>
                  <svg
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                    onClick={handleShow}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </div>

          </div>
        </nav>
        {/* ========== Profile Heading ========= */}
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ position: "relative" }}>
            {" "}
            <img
              src={profileUser.coverImage}
              style={{ height: "65vh", width: "100%" }}
            />
          </div>
          <div style={{ position: "absolute", top: "66%", left: "45%" }}>
            <img
              src={profileUser.profileImage}
              className="mb-2"
              style={{
                borderRadius: "50%",
                height: "130px",
                width: "130px",
                boxShadow: "1px 1px 7px",
              }}
            />
            <div
              style={{
                fontFamily: "inherit",
                fontSize: "25px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {profileUser.firstName} {profileUser.lastName}
            </div>
          </div>
        </div>

        <div className="row w-100 mt-3 col-sm profileUpperPart">
          <div className="col-2"></div>

          <div
            className="col-1 rounded-start border-top border-bottom border-end"
            style={{ textAlign: "center" }}
          >
            <div className="followNum">{follower.length}</div>
            <div
              className="followWord"
              onClick={() => {
                setSearch(true);
                setFollowCkick("Followers");
                setUpdateProfileClick("Follow");
              }}
            >
              Followers
            </div>
          </div>

          <div
            className="col-1 rounded-end border-top border-bottom border-end"
            style={{ textAlign: "center" }}
          >
            <div className="followNum">{following.length}</div>
            <div
              className="followWord"
              onClick={() => {
                setSearch(true);
                setFollowCkick("Following");
                setUpdateProfileClick("Follow");
              }}
            >
              Following
            </div>
          </div>
          <div className="col-6 editProfile" style={{ textAlign: "end" }}>
            <DropdownButton title="Edit Profile" variant="">
              <Dropdown.Item
                onClick={() => {
                  setSearch(true);
                  setIsUpload(false);
                  setUpdateProfileClick("Update");
                  setSelectPhoto("Profile");
                }}
              >
                Change profile photo
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSearch(true);
                  setIsUpload(false);
                  setUpdateProfileClick("Update");
                  setSelectPhoto("Cover");
                }}
              >
                Change cover photo
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        {/* ====== Profile Body ============ */}

        <div className="container mt-5">
          <div className="row myProfile" style={{ justifyContent: "center" }}>
            <div className="col-4 ms-2 me-2 profileInfo">
              <MyInfos />
            </div>
            <div className="col-6 ms-2 me-2 profilePost">
              <ProfilePosts />{" "}
            </div>
          </div>
        </div>

        {/* ============== check sign out ================*/}
        <>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Out?</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
            <Modal.Footer>
              <Button variant="btn btn-outline-dark" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  localStorage.clear();
                  setToken("");
                  navigate("/login");
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        {/*=================== Following and followers VS Edit Ptofile ========================*/}
        <>
          <Modal
            show={search}
            onHide={() => {
              setSearch(false);
              setIsLoader(true);
            }}
            dialogClassName="modal-90w w-50"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                {updateProfileClick === "Update"
                  ? "Upload"
                  : followCkick === "Following"
                  ? "My Following"
                  : "My Followers"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {updateProfileClick === "Update" ? (
                <>
                  {" "}
                  {/* >> if user click on Edit Profile >>> */}
                  <div>
                    <div>
                      <input
                        type="file"
                        className="border"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setIsUpload(true);
                        }}
                      ></input>
                      <br />
                      {isUpload && (
                        <button
                          className="uploadBottom mb-2"
                          onClick={() => {
                            uploadImage();
                            setIsLoader(false);
                          }}
                        >
                          Upload
                        </button>
                      )}

                      {/* ===== Request of update photos ===== */}
                      {isLoader ? (
                        <></>
                      ) : updatePhoto ? (
                        <Modal.Footer>
                          <Button
                            onClick={() => {
                              {
                                selectPhoto === "Profile"
                                  ? axios /*  if select Change profile photo */
                                      .put(
                                        "https://sky-hcfs.onrender.com/users/update/info",
                                        { profileImage: updatePhoto },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((result) => {
                                        profileUser.profileImage = updatePhoto;
                                        setSearch(false);
                                        setIsUpload(false);
                                        setIsLoader(!isLoader);
                                        setUpdatePhoto("");
                                      })
                                      .catch((err) => {
                                        console.log(err.response.data);
                                      })
                                  : axios /* if select Change cover photo */
                                      .put(
                                        "https://sky-hcfs.onrender.com/users/update/info",
                                        { coverImage: updatePhoto },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((result) => {
                                        profileUser.coverImage = updatePhoto;
                                        setSearch(false);
                                        setIsUpload(false);
                                        setIsLoader(!isLoader);
                                        setUpdatePhoto("");
                                      })
                                      .catch((err) => {
                                        console.log(err.response.data);
                                      });
                              }
                            }}
                          >
                            Done
                          </Button>
                        </Modal.Footer>
                      ) : (
                        <div className="loader"></div>
                      )}
                    </div>
                  </div>
                </>
              ) : followCkick === "Following" ? (
                <div className="col">
                  {" "}
                  {/* >> if user click on following >>>> */}
                  {following.map((user, i) => {
                    return (
                      <div className="mb-2" key={user._id}>
                        <img
                          className="me-2"
                          id={user._id}
                          style={{ borderRadius: "50%" }}
                          src={user.profileImage}
                          width={60}
                          height={60}
                        />
                        <span id={user._id} style={{ cursor: "pointer" }}>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="col">
                  {" "}
                  {/* >> if user click on followers >>>>*/}
                  {follower.map((user, i) => {
                    return (
                      <div className="mb-2" key={user._id}>
                        <img
                          className="me-2"
                          id={user._id}
                          style={{ borderRadius: "50%" }}
                          src={user.profileImage}
                          width={60}
                          height={60}
                        />
                        <span
                          id={user._id}
                          style={{ cursor: "pointer" }}
                        >
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Modal.Body>
          </Modal>
        </>
        {/* ============================================================== */}
      </div>
    </profileContext.Provider>
  );
};

export default MyProfile;
