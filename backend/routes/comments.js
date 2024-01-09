const express = require("express");
const commentsRouter = express.Router();

// commentsRouter on http://localhost:5000/comments

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
// http://localhost:5000/comments/:id/post

// Delete >>
// http://localhost:5000/comments/delete/:id

// Put >>
// http://localhost:5000/comments/update/:id
