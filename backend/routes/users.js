const express = require("express");
const usersRouter = express.Router();

//usersRouter on http://localhost:5000/users

usersRouter.post("/login");
usersRouter.post("/register");
usersRouter.put("/:id/follower");
usersRouter.put("/:id/following");

module.exports = usersRouter;
