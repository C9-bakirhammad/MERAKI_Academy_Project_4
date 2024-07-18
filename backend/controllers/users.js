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
    profileImage,
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
    profileImage,
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
            following: result.following,
            profileImage: result.profileImage,
            likedPosts: result.likedPosts,
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

//getUserById fucntion >>
const getUserById = (req, res) => {
  const { id } = req.params;
  usersModel
    .findOne({ _id: id }, "-phoneNumber -password -role -__v")
    .populate("followers", "firstName lastName country profileImage _id")
    .populate("following", "firstName lastName country profileImage _id")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "User is found",
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// get user by Id without populate >>
const getUser = (req, res) => {
  const { id } = req.params;
  usersModel
    .findOne({ _id: id }, "-phoneNumber -password -role -__v")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "User is found",
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// find users >>
const findUsers = (req, res) => {
  const { name } = req.params;
  usersModel
    .find({ searchFname: name }, "firstName lastName profileImage")
    .then((result) => {
      if (result.length !== 0) {
        return res.status(200).json({
          success: true,
          message: "Users found",
          users: result,
        });
      }
      res.status(404).json({
        success: false,
        message: "No users found",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// getUserByCountry function >>
const getUsersByCountry = (req, res) => {
  const { country } = req.params;
  usersModel
    .find({ country: country }, "firstName lastName profileImage country")
    .then((result) => {
      if (result.length !== 0) {
        return res.status(200).json({
          success: true,
          message: "Users found",
          users: result,
        });
      }
      res.status(404).json({
        success: false,
        message: "No users found",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// add following and followers >>
const addFollow = (req, res) => {
  const id = req.token.userId;
  const { friend } = req.params;

  usersModel // * add to follower
    .findOneAndUpdate(
      { _id: friend },
      { $push: { followers: id } },
      { new: true }
    )
    .then((result) => {
      usersModel // * add to following
        .findOneAndUpdate(
          { _id: id },
          { $push: { following: friend } },
          { new: true }
        )
        .then((result) => {
          res.status(201).json({
            success: true,
            message: "Add successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Following Server error",
            err: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Follower Server error",
        err: err,
      });
    });
};

// remove following and follower>>
const unFollow = (req, res) => {
  const id = req.token.userId;
  const { friend } = req.params;

  usersModel // * remove from follower
    .findOneAndUpdate(
      { _id: friend },
      { $pull: { followers: id } },
      { new: true }
    )
    .then((result) => {
      usersModel // * remove from following
        .findOneAndUpdate(
          { _id: id },
          { $pull: { following: friend } },
          { new: true }
        )
        .then((result) => {
          res.status(201).json({
            success: true,
            message: "User removed successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Followimg Server error",
            err: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Follower Server error",
        err: err,
      });
    });
};

// update user Info >>
const updateUserInfo = (req, res) => {
  const userId = req.token.userId;

  usersModel
    .findOneAndUpdate({ _id: userId }, req.body)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Info updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  register,
  login,
  getUserById,
  getUser,
  findUsers,
  getUsersByCountry,
  addFollow,
  unFollow,
  updateUserInfo,
};
