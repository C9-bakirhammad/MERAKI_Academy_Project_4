import React, { useContext, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import UserPart from "./userPart/UserPart";
import PostsPart from "./postsPart/PostsPart";
import { usersContext } from "../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

const Home = () => {
  const { userInfo, setToken } = useContext(usersContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [search, setSearch] = useState(false);

  return (
    <div className="homeBg">
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-dark homeNav "
        style={{ backgroundColor: "#1b5acf" }}
      >
        <div className="row container-fluid">
          <div className="col homeMyprofile">
            <div className="title">Sky</div>
          </div>

          <div className="col divSearch homeMyprofile">
            {" "}
            <input
              className="searchInput"
              placeholder=" Search"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
            />
            <IoSearch
              className="col searchIcon"
              style={{ cursor: "pointer" }}
              size={40}
              onClick={(e) => {
                axios
                  .get(
                    `https://sky-hcfs.onrender.com/users/find/${searchValue}`
                  )
                  .then((result) => {
                    setSearchResult(result.data.users);
                  })
                  .catch((err) => {
                    console.log(err.response.data.message);
                    setIsError(err.response.data.message);
                  });
                setSearch(true);
              }}
            />
          </div>

          <div className="col" style={{ textAlign: "end", color: "white" }}>
            <div className="row">
              <div className="col" style={{ textAlign: "end" }}>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </div>

              <div className="col" style={{ textAlign: "center" }}>
                <Link className="nav-link active" to="/profile">
                  MyProfile
                </Link>
              </div>

              {/*    <div className="col" style={{ textAlign: "start" }}>
                <Link className="nav-link active" to="/message">
                  Chatting
                </Link>
              </div> */}

              <div className="col-1">
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
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-4 me-3 homeUserPart">
            <UserPart />
          </div>
          <div className="col-6 homePostP">
            <PostsPart />
          </div>
        </div>
      </div>
      {/* ===================================================================================== */}

      {/* =============================================================== */}
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
      <>
        <Modal
          show={search}
          onHide={() => setSearch(false)}
          dialogClassName="modal-90w w-50"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Search result
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {searchResult.length === 0 ? (
              <p>{isError}</p>
            ) : (
              <div className="col">
                {searchResult.map((user, i) => {
                  return (
                    <div className="mb-2" key={user._id}>
                      <img
                        className="me-1"
                        id={user._id}
                        style={{ borderRadius: "50%" }}
                        src={user.profileImage}
                        width={60}
                        height={60}
                      />
                      <span
                        id={user._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          {
                            user._id === userInfo.userId
                              ? navigate("/profile")
                              : navigate(`/friend/${user._id}`);
                          }
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-dark"
              onClick={() => {
                setSearch(false);
                setIsError("");
                setSearchResult([]);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Home;
