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
              {isEmpty && firstName === "" ? (
                <>
                  <input
                    type="text"
                    className="form-control is-invalid"
                    required
                    onClick={() => {
                      setIsEmpty(!isEmpty);
                    }}
                  />
                  <div className="invalid-feedback">Please enter name</div>
                </>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              )}
            </div>
            <div className="col mb-2">
              <label>Last Name</label>
              {isEmpty && lastName === "" ? (
                <>
                  <input
                    type="text"
                    className="form-control is-invalid"
                    required
                    onClick={() => {
                      setIsEmpty(!isEmpty);
                    }}
                  />
                  <div className="invalid-feedback">Please enter name</div>
                </>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="last name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col mb-2">
              <label>Birth Date</label>
              {isEmpty && birthDate === "" ? (
                <>
                  <input
                    type="date"
                    className="form-control is-invalid"
                    required
                    onClick={() => {
                      setIsEmpty(!isEmpty);
                    }}
                  />
                  <div className="invalid-feedback">Please enter date</div>
                </>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="dd-mm-yyyy"
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                />
              )}
            </div>
            <div className="col mb-2">
              <label>Country</label>
              {isEmpty && country === "" ? (
                <>
                  <input
                    type="text"
                    className="form-control is-invalid"
                    required
                    onClick={() => {
                      setIsEmpty(!isEmpty);
                    }}
                  />
                  <div className="invalid-feedback">Please enter country</div>
                </>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="your country"
                  onChange={(e) => {
                    setCountry(e.target.value.toLowerCase());
                  }}
                />
              )}
            </div>
          </div>

          <div className="mb-2">
            <label>Email</label>
            {isEmpty && email === "" ? (
              <>
                <input
                  type="email"
                  className="form-control is-invalid"
                  required
                  onClick={() => {
                    setIsEmpty(!isEmpty);
                  }}
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

          <div className="mb-2">
            <label>Password</label>
            {isEmpty && password === "" ? (
              <>
                <input
                  type="password"
                  className="form-control is-invalid"
                  required
                  onClick={() => {
                    setIsEmpty(!isEmpty);
                  }}
                />
                <div className="invalid-feedback">Please enter password</div>
              </>
            ) : (
              <input
                type="password"
                className="form-control"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            )}
          </div>

          <div>
            <label>Confirm Password</label>
            {isEmpty && confirmPassword === "" ? (
              <>
                <input
                  type="password"
                  className="form-control is-invalid"
                  required
                  onClick={() => {
                    setIsEmpty(!isEmpty);
                  }}
                />
                <div className="invalid-feedback">Please enter password</div>
              </>
            ) : (
              <input
                type="password"
                className="form-control"
                placeholder="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            )}
          </div>

          <div className="row justify-content-center">
            {errResp && <div className="mt-3">{errResp}</div>}
            <button
              className="col button mt-3"
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
                  return setIsEmpty(!isEmpty);
                }
                console.log(email)
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
                    console.log("reggg");
                    navigate("/login");
                  })
                  .catch((err) => {
                    console.log(err);
                    setErrResp(err.response.data.message);
                  });
              }}
            >
              Register
            </button>
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
