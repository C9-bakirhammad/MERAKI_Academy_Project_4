const express = require("express");
const usersRouter = express.Router();

//usersRouter on http://localhost:5000/users

// From controllers folder
const {
  register,
  login,
  getUserById,
  getUsersByCountry,
  updateFollowers,
  updateFollowing,
  getAllFollowById,
} = require("../controllers/users");

// From middleware folder
const { confirmPassword } = require("../middleware/confirmPassword");

usersRouter.get("/", getUsersByCountry);
usersRouter.get("/:id", getUserById);
usersRouter.get("/follow/:id", getAllFollowById);
usersRouter.post("/login", login);
usersRouter.post("/register", confirmPassword, register);
usersRouter.put("/:id/follower", updateFollowers);
usersRouter.put("/:id/following", updateFollowing);

module.exports = usersRouter;

// >> Get
// `http://localhost:5000/users?country=${variable}`
// http://localhost:5000/users/:id
// http://localhost:5000/users/follow/:id

// >> Post
// http://localhost:5000/users/login
// http://localhost:5000/users/register

// >> Put
// http://localhost:5000/users/:id/follower
// http://localhost:5000/users/:id/following
