const express = require("express");
const usersRouter = express.Router();

//usersRouter on http://localhost:5000/users

const { register, login } = require("../controllers/users");

const { confirmPassword } = require("../middleware/confirmPassword");

usersRouter.post("/login", login);
usersRouter.post("/register", confirmPassword, register);
usersRouter.put("/:id/follower");
usersRouter.put("/:id/following");

module.exports = usersRouter;
