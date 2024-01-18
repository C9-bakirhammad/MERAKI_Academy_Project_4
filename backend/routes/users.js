const express = require("express");
const usersRouter = express.Router();

//usersRouter on http://localhost:5000/users

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
// http://localhost:5000/users/find/:name
// http://localhost:5000/users/search/:country
// http://localhost:5000/users/:id
// http://localhost:5000/users/user/:id
// http://localhost:5000/users/follow/:friend
// http://localhost:5000/users/:friend/unFollow

// >> Post
// http://localhost:5000/users/login
// http://localhost:5000/users/register

// >> Put

// http://localhost:5000/users/update/info
