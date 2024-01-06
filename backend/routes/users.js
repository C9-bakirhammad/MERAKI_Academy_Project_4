const express = require("express");
const usersRouter = express.Router();

//usersRouter on http://localhost:5000/users

// From controllers folder
const {
  register,
  login,
  getUserById,
  getUsersByCountry,
  addFollow,
  unFollow,
  getAllFollowsById,
  updateLikesByUserId
} = require("../controllers/users");

// From middleware folder
const { confirmPassword } = require("../middleware/confirmPassword");

usersRouter.get("/", getUsersByCountry);
usersRouter.get("/:id", getUserById);
usersRouter.get("/fNumber/:id", getAllFollowsById);
usersRouter.post("/login", login);
usersRouter.post("/register", confirmPassword, register);
usersRouter.put("/:id/follow", addFollow);
usersRouter.put("/:id/unFollow", unFollow);
usersRouter.put("/:id/userLikes", updateLikesByUserId);

module.exports = usersRouter;

// >> Get
// `http://localhost:5000/users?country=${variable}`
// http://localhost:5000/users/:id
// http://localhost:5000/users/fNumber/:id

// >> Post
// http://localhost:5000/users/login
// http://localhost:5000/users/register

// >> Put
// http://localhost:5000/users/:id/follow
// http://localhost:5000/users/:id/unFollow
// http://localhost:5000/users/:id/userLikes
