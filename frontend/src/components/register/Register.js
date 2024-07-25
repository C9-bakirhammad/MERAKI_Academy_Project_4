import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Loader from "../Exta/Loader";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errResp, setErrResp] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <div className="RegMainBKg">
      {/* <div className="registerNav">
        <h3 className="header">Sky</h3>
      </div> */}

      <div className="container body">
        <form className="subBody mt-3">
          <div className="row justify-content-evenly inputs">
            <div className="col mb-2">
              <label>First Name*</label>
              <input
                type="text"
                className={
                  isEmpty && firstName === ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="first name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              {isEmpty && firstName === "" && (
                <div className="invalid-feedback">Please enter name</div>
              )}
            </div>
            <div className="col mb-2">
              <label>Last Name*</label>
              <input
                type="text"
                className={
                  isEmpty && lastName === ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="last name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              {isEmpty && lastName === "" && (
                <div className="invalid-feedback">Please enter name</div>
              )}
            </div>
          </div>

          <div className="row inputs">
            <div className="col mb-2">
              <label>Birth Date*</label>
              <input
                type="date"
                className={
                  isEmpty && birthDate === ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  setBirthDate(
                    e.target.value
                  ) /* .split("/").reverse().join("-") */;
                }}
              />
              {isEmpty && birthDate === "" && (
                <div className="invalid-feedback">Please enter date</div>
              )}
            </div>
            <div className="col mb-2">
              <label>Country*</label>
              <input
                type="text"
                className={
                  isEmpty && country === ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="your country"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              {isEmpty && country === "" && (
                <div className="invalid-feedback">Please enter country</div>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label>Email*</label>
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

          <div className="mb-2">
            <label style={{ position: "relative" }}>
              Password*{" "}
              <span
                className="span"
                style={{ fontSize: "15px", color: "grey" }}
              >
                "At least 8 characters, capital letter and numbers"
              </span>
            </label>
            <input
              type="password"
              className={
                isEmpty && password === ""
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isEmpty && password === "" && (
              <div className="invalid-feedback">Please enter password</div>
            )}
          </div>

          <div>
            <label>Confirm Password*</label>
            <input
              type="password"
              className={
                isEmpty && confirmPassword === ""
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder="confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {isEmpty && confirmPassword === "" && (
              <div className="invalid-feedback">Please enter password</div>
            )}
          </div>

          <div className="row justify-content-center errResp">
            {errResp && (
              <div className="mt-3" style={{ color: "red" }}>
                {errResp}
              </div>
            )}

            {/* ========== Register button with sending the request =================== */}
            <Button
              className="col bg-black mt-3"
              onClick={() => {
                if (
                  // check if any field is empty
                  firstName === "" ||
                  lastName === "" ||
                  country === "" ||
                  birthDate === "" ||
                  email === "" ||
                  password === "" ||
                  confirmPassword === ""
                ) {
                  return setIsEmpty(true);
                }

                if (email.includes("@") === false) {
                  // check if email don't contain @ symbol
                  return setErrResp("Email must contain @ symbol");
                }

                if (password.length < 8) {
                  // check if passowrd more than 8 characters
                  return setErrResp(
                    "Password must contain at least 8 characters"
                  );
                }

                if (password.match(/[A-Z]/g) === null) {
                  return setErrResp(
                    "Password must contain Capital Letter and numbers"
                  );
                } else if (password.match(/[0-9]/g) === null) {
                  return setErrResp(
                    "Password must contain Capital Letter and numbers"
                  );
                }

                setLoader(true); // show the loader

                axios // Sending the request
                  .post("https://sky-pwcy.onrender.com/users/register", {
                    firstName,
                    lastName,
                    country,
                    birthDate,
                    email,
                    password,
                    confirmPassword,
                  })
                  .then((result) => {
                    setLoader(false);
                    navigate("/login");
                  })
                  .catch((err) => {
                    setLoader(false);
                    setErrResp(err.response.data.message);
                  });
              }}
            >
              Register
            </Button>
          </div>
        </form>

        {/* ======== Back to login Button ========== */}
        <div className="row justify-content-end">
          <Button
            className=" mt-3 mb-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to login
          </Button>
        </div>
      </div>
      {/* =========== loader in regerster =================*/}
      {loader && <Loader />}
    </div>
  );
};

export default Register;
