import React, { useContext } from "react";

import { useState } from "react";
import { usersContext } from "../App";

const UploadImg = () => {
  const [image, setImage] = useState("");
  const { postImage, setPostImage } = useContext(usersContext);
  console.log(postImage);
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "szb3g9r3");
    data.append("cloud_name", "drkox9efz");
    fetch("https://api.cloudinary.com/v1_1/drkox9efz/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPostImage(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={postImage} />
      </div>
    </div>
  );
};
export default UploadImg;
