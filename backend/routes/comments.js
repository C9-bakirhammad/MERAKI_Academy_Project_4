const express = require("express");
const commentsRouter = express.Router();

// commentsRouter on https://sky-pwcy.onrender.com/comments

const {
  createComment,
  deleteCommentById,
  updateCommentById,
} = require("../controllers/comments");

const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

commentsRouter.post("/post/:id",authentication,authorization("CREATE_COMMENT"), createComment);
commentsRouter.delete("/delete/:id", deleteCommentById);
commentsRouter.put("/update/:id", updateCommentById);

module.exports = commentsRouter;

//Post >>
// https://sky-pwcy.onrender.com/comments/:id/post

// Delete >>
// https://sky-pwcy.onrender.com/comments/delete/:id

// Put >>
// https://sky-pwcy.onrender.com/comments/update/:id
