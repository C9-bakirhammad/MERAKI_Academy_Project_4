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

// update followers >>
const updateFollowers = (req, res) => {
  const { id } = req.params;
  const follower = req.body.follower;
  const isFollow = req.body.isFollow;

  if (isFollow) {
    return usersModel
      .findOneAndUpdate(
        { _id: id },
        { $push: { followers: follower } },
        { new: true }
      )
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "User added to followers",
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
  // * update Follower if user UnFollow
  usersModel
    .findOneAndUpdate(
      { _id: id },
      { $pull: { followers: follower } },
      { new: true }
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "User removed from followers",
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

// update following >>
const updateFollowing = (req, res) => {
  const { id } = req.params;
  const following = req.body.following;
  const isFollow = req.body.isFollow;

  if (isFollow) {
    return usersModel
      .findOneAndUpdate(
        { _id: id },
        { $push: { following: following } },
        { new: true }
      )
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "User added to following",
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
  // * update Following if user UnFollow
  usersModel
    .findOneAndUpdate(
      { _id: id },
      { $pull: { following: following } },
      { new: true }
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "User removed from following",
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

// getAllFollowById function >>
const getAllFollowById = (req, res) => {
  const { id } = req.params;
  usersModel
    .findOne({ _id: id }, "firstName lastName followers following")
    .populate(
      "followers",
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



module.exports = {
  register,
  login,
  getUserById,
  getUsersByCountry,
  updateFollowers,
  updateFollowing,
  getAllFollowById,
};
