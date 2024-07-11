import React, { useContext, useState } from "react";
import "./Login.css";
import { Button } from "react-bootstrap";
import { usersContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadImg from "../UploadImg";
import Loader from "../Exta/Loader";

const Login = () => {
  const { setToken, setUserInfo, setLikedPosts, setFollowing } =
    useContext(usersContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errResp, setErrResp] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <div className="mainBg">
      <div className="loginNav">
        <h3 className="header"></h3>
      </div>

      <div className="container ">
        <div className="row mt-4 ms-2 me-2 subContainer">
          <div className="col me-1">
            <h4 className="title" style={{ color: "#1B5ACF", fontSize: "70px" }}>Sky</h4>
            <p className="subtitle" style={{ fontSize: "25px" }}>
              "The place where you are Free and Safe"
            </p>
          </div>

          <div className="col bg-white formBg loginForm">
            <form className="row loginForm">
              <div>
                <div className="mb-2">
                  <label className="mt-4">Email</label>
                  <input
                    type="email"
                    className={
                      isEmpty && email === ""
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    placeholder="example@gmail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {isEmpty && email === "" && (
                    <div className="invalid-feedback">Please enter email</div>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className={
                      isEmpty && password === ""
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {isEmpty && password === "" && (
                    <div className="invalid-feedback">
                      Please enter password
                    </div>
                  )}
                </div>
              </div>

              <div>
                {errResp && (
                  <div className="ms-2 mb-2" style={{ color: "red" }}>
                    {errResp}
                  </div>
                )}
              </div>

              <div className="row">
                <Button
                  className="ms-3"
                  onClick={() => {
                    if (email === "" || password === "") {
                      return setIsEmpty(!isEmpty);
                    }
                    setLoader(true);
                    axios
                      .post("https://sky-hcfs.onrender.com/users/login", {
                        email,
                        password,
                      })
                      .then((result) => {
                        localStorage.setItem("token", result.data.token);
                        localStorage.setItem(
                          "UI",
                          JSON.stringify(result.data.userInfo)
                        );
                        setLoader(false);
                        setToken(result.data.token);
                        setUserInfo(result.data.userInfo);
                        navigate("/home");
                      })
                      .catch((err) => {
                        setLoader(false);
                        setErrResp(err.response.data.message);
                      });
                  }}
                >
                  Login
                </Button>
              </div>

              <div>
                <div style={{ textAlign: "center" , marginTop: "5px"}}>
              OR
                </div>
              </div>

              <div className="row">
                {" "}
                <Button
                  className="btn btn-dark btn-lg mt-2 mb-3 ms-3"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create new account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* To show loader when login */}
      {loader && <Loader />}
    </div>
  );
};

export default Login;
