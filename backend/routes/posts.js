const express = require("express");
const postsRouter = express.Router();

// postsRouter on http://localhost:5000/posts

const { createPost, getPostsByAuthorId } = require("../controllers/posts");

postsRouter.get("/authors", getPostsByAuthorId);
postsRouter.post("/createPost", createPost);
postsRouter.put("/:id");
postsRouter.delete("/:id");

module.exports = postsRouter;

// Get >>
// http://localhost:5000/posts/authors

// Post >>
// http://localhost:5000/posts/createPost
