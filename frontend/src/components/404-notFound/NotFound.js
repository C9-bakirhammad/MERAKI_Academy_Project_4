import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <p className="notFoundMessage"> 404-Not Found</p>
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

export default NotFound;
