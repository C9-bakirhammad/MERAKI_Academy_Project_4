const express = require("express");
const postsRouter = express.Router();

// postsRouter on http://localhost:5000/posts

postsRouter.post("/");
postsRouter.get("/:id/author");
postsRouter.put("/:id");
postsRouter.delete("/:id");

module.exports = postsRouter;
