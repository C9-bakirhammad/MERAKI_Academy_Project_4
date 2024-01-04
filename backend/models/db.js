const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then((res) => {
    console.log("DB Is Ready To Use");
  })
  .catch((err) => {
    console.log("Error From db connection : ", err);
  });
