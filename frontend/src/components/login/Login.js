import React, { useContext, useState } from "react";
import "./Login.css";
import { Button } from "react-bootstrap";
import { usersContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { setToken, setUserInfo } = useContext(usersContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errResp, setErrResp] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="mainBg">
      <div className="loginNav"><h3 className="header">Sky</h3></div>

      <div className="row mt-5 ms-2 me-2">
        <div className="col me-1">
          <h4>Description</h4>
        </div>

        <div className="col">
          <form className="formBg">
            <div className="col-sm-8 mb-2 ms-3">
              <label className="mt-4">Email</label>
              {isEmpty && email === "" ? (
                <>
                  <input
                    type="email"
                    className="form-control is-invalid"
                    required
                  />
                  <div className="invalid-feedback">Please enter email</div>
                </>
              ) : (
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              )}
            </div>

            <div className="col-sm-8 mb-3 ms-3 me-5">
              <label>Password</label>
              {isEmpty && password === "" ? (
                <>
                  <input
                    type="password"
                    className="form-control is-invalid"
                    required
                  />
                  <div className="invalid-feedback">Please enter password</div>
                </>
              ) : (
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              )}
            </div>

            <Button
              className="ms-3"
              onClick={() => {
                if (email === "" || password === "") {
                  return setIsEmpty(true);
                }
                console.log("check");
              }}
            >
              Login
            </Button>
            {errResp && (
              <div className="invalid-feedback">wrong email or password</div>
            )}
          </form>

          <Button
            className="btn btn-dark btn-lg mt-3 mb-2"
            onClick={() => {
              navigate("/register");
            }}
          >
            Create new account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
