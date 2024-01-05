const usersModel = require("../models/user");

// create new user
const register = (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    country,
    birthDate,
    phoneNumber,
    email,
    password,
  } = req.body;
  const newUser = new usersModel({
    firstName,
    middleName,
    lastName,
    country,
    birthDate,
    phoneNumber,
    email,
    password,
    role: "65975412ca0cdedfbfa0185c",
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Is Created",
        user: result,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Email is exists",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      }
    });
};

// login function >>
const login = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  usersModel
    .findOne({ email })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {});
};
module.exports = { register, login };
