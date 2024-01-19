import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import("./Register.css");

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
  console.log(birthDate);

  return (
    <div className="RegMainBg">
      <div className="registerNav">
        <h3 className="header">Sky</h3>
      </div>

      <div className="container body mt-3">
        <form>
          <div className="row justify-content-evenly">
            <div className="col mb-2">
              <label>First Name</label>
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
              <label>Last Name</label>
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

          <div className="row">
            <div className="col mb-2">
              <label>Birth Date</label>
              <input
                type="text"
                className={
                  isEmpty && birthDate === ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  setBirthDate(e.target.value.split("/").reverse().join("-"));
                }}
              />
              {isEmpty && birthDate === "" && (
                <div className="invalid-feedback">Please enter date</div>
              )}
            </div>
            <div className="col mb-2">
              <label>Country</label>
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
            <label>Email</label>
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
            <label>Password</label>
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
            <label>Confirm Password</label>
            <input
              type="password"
              className={
                isEmpty && confirmPassword === ""
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {isEmpty && confirmPassword === "" && (
              <div className="invalid-feedback">Please enter password</div>
            )}
          </div>

          <div className="row justify-content-center">
            {errResp && <div className="mt-3">{errResp}</div>}
            <Button
              className="col bg-black mt-3"
              onClick={() => {
                if (
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
                axios
                  .post("http://localhost:5000/users/register", {
                    firstName,
                    lastName,
                    country,
                    birthDate,
                    email,
                    password,
                    confirmPassword,
                  })
                  .then((result) => {
                    navigate("/login");
                  })
                  .catch((err) => {
                    setErrResp(err.response.data.message);
                  });
              }}
            >
              Register
            </Button>
          </div>
        </form>

        <div className="row justify-content-end">
          <Button
            className="col-3 mt-2 mb-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
