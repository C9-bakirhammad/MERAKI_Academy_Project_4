const express = require("express");
const usersRouter = express.Router();

//usersRouter on https://sky-pwcy.onrender.com/users

// From controllers folder
const {
  register,
  login,
  getUserById,
  findUsers,
  getUsersByCountry,
  addFollow,
  unFollow,
  getUser,
  updateUserInfo,
} = require("../controllers/users");

// From middleware folder
const { confirmPassword } = require("../middleware/confirmPassword");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

usersRouter.get("/search/:country", getUsersByCountry);
usersRouter.get("/find/:name", findUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/user/:id", getUser);
usersRouter.post("/login", login);
usersRouter.post("/register", confirmPassword, register);
usersRouter.get(
  "/follow/:friend",
  authentication,
  authorization("FOLLOW"),
  addFollow
);
usersRouter.get(
  "/:friend/unFollow",
  authentication,
  authorization("UNFOLLOW"),
  unFollow
);
usersRouter.put("/update/info", authentication, updateUserInfo);

module.exports = usersRouter;

// >> Get
// https://sky-pwcy.onrender.com/users/find/:name
// https://sky-pwcy.onrender.com/users/search/:country
// https://sky-pwcy.onrender.com/users/:id
// https://sky-pwcy.onrender.com/users/user/:id
// https://sky-pwcy.onrender.com/users/follow/:friend
// https://sky-pwcy.onrender.com/users/:friend/unFollow

// >> Post
// https://sky-pwcy.onrender.com/users/login
// https://sky-pwcy.onrender.com/users/register

// >> Put

// https://sky-pwcy.onrender.com/users/update/info
