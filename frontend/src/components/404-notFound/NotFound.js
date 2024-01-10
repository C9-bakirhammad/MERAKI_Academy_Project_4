import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      404-NotFound
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default NotFound;
