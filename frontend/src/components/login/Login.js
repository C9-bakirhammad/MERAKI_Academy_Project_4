import React, { useContext, useState } from "react";
import "./Login.css";
import { Button } from "react-bootstrap";
import { usersContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadImg from "../UploadImg";

const Login = () => {
  const { setToken, setUserInfo, setLikedPosts, setFollowing } =
    useContext(usersContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errResp, setErrResp] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="mainBg">
      <div className="loginNav">
        <h3 className="header"></h3>
      </div>

      <div className="container container-sm">
        <div className="row mt-5 ms-2 me-2">
          <div className="col me-1">
            <h4 style={{ color: "#1B5ACF", fontSize: "70px" }}>Sky</h4>
            <p style={{ fontSize: "25px" }}>
              "The place where you are Free and Safe"
            </p>
          </div>

          <div className="col bg-white formBg">
            <form className="row">
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
                    axios
                      .post("http://localhost:5000/users/login", {
                        email,
                        password,
                      })
                      .then((result) => {
                        localStorage.setItem("token", result.data.token);
                        localStorage.setItem(
                          "UI",
                          JSON.stringify(result.data.userInfo)
                        );
                        setToken(result.data.token);
                        setUserInfo(result.data.userInfo);
                        navigate("/home");
                      })
                      .catch((err) => {
                        setErrResp(err.response.data.message);
                      });
                  }}
                >
                  Login
                </Button>
              </div>

              <div>
                <div style={{ textAlign: "center" }}>
                  ________________________________________________
                </div>
              </div>

              <div className="row">
                {" "}
                <Button
                  className="btn btn-dark btn-lg mt-3 mb-3 ms-3"
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
    </div>
  );
};

export default Login;
