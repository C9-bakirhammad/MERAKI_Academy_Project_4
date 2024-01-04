const express = require("express");
const commentsRouter = express.Router();

// commentsRouter on http://localhost:5000/comments

commentsRouter.post("/:id/post");
commentsRouter.delete("/:id");
commentsRouter.put("/:id");

module.exports = commentsRouter;
