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
    postsLike,
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
    postsLike,
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
    .findOne({ _id: id }, "-phoneNumber -password -role")
    .populate(
      "followers",
      "-birthDate -phoneNumber -email -password -role -coverImage -photos -myPages -likedPages -followers -following -__v"
    )
    .populate(
      "following",
      "-birthDate -phoneNumber -email -password -role -coverImage -photos -myPages -likedPages -followers -following -__v"
    )
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

// getUserByCountry function >>
const getUsersByCountry = (req, res) => {
  const { country } = req.query;
  usersModel
    .find(
      { country: country },
      "-phoneNumber -password -email -role -followers -coverImage -photos"
    )
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
  const { id } = req.params; //! edit from token
  const friend = req.body.friend;

  usersModel // * add to follower
    .findOneAndUpdate(
      { _id: id },
      { $push: { followers: friend } },
      { new: true }
    )
    .then((result) => {
      usersModel // * add to following
        .findOneAndUpdate(
          { _id: friend },
          { $push: { following: id } },
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
  const { id } = req.params; //! edit from token
  const friend = req.body.friend;

  usersModel // * remove from follower
    .findOneAndUpdate(
      { _id: id },
      { $pull: { followers: friend } },
      { new: true }
    )
    .then((result) => {
      usersModel // * remove from following
        .findOneAndUpdate(
          { _id: friend },
          { $pull: { following: id } },
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

// getAllFollowById function >>
const getAllFollowsById = (req, res) => {
  const { id } = req.params;
  usersModel
    .findOne({ _id: id }, "firstName lastName followers following")
    .populate(
      "followers", //! edit here 
      "-birthDate -phoneNumber -email -password -role -coverImage -photos -myPages -likedPages -followers -following -__v"
    )
    .populate(
      "following",
      "-birthDate -phoneNumber -email -password -role -coverImage -photos -myPages -likedPages -followers -following -__v"
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Success",
        result: result,
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

// add/remove liked posts >>
const updateLikesByUserId = (req, res) => {
  const { id } = req.params; //! edit from token
  const { postId } = req.body;
  const { isLike } = req.body;

  if (isLike) { // ! handle if user not found!
    return usersModel // * add like to user
      .findOneAndUpdate({ _id: id }, { $push: { postsLike: postId } })
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "Add successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  }

  usersModel // * remove like from user
    .findOneAndUpdate({ _id: id }, { $pull: { postsLike: postId } })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Removed successfully",
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
  getUsersByCountry,
  addFollow,
  unFollow,
  getAllFollowsById,
  updateLikesByUserId,
};
