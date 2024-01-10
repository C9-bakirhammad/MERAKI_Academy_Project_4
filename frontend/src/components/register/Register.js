import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div>
      Register
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Back to login
      </Button>
    </div>
  );
};

export default Register;
