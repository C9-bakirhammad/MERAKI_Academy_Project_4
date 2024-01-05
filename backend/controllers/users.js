const usersModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create new user >>
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
    .populate("role", "-_id")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: "Wrong Email or password",
        });
      }
      try {
        const checkPassowrd = await bcrypt.compare(password, result.password);
        if (!checkPassowrd) {
          return res.status(403).json({
            success: false,
            message: "Wrong email or Password",
          });
        }

        const payload = {
          userId: result._id,
          role: result.role,
        };

        const options = {
          expiresIn: "120m",
        };

        const token = jwt.sign(payload, process.env.SECRET, options);

        res.status(200).json({
          success: true,
          message: "Valid login",
          token: token,
          userInfo: {
            userId: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            country: result.country,
            profileImage: result.profileImage,
          },
        });
      } catch (err) {
        throw err;
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = { register, login };
