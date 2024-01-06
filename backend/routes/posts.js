const express = require("express");
const postsRouter = express.Router();

// postsRouter on http://localhost:5000/posts

const { createPost, getPostsByAuthorId,deletePostById } = require("../controllers/posts");

postsRouter.get("/authors", getPostsByAuthorId);
postsRouter.post("/createPost", createPost);
postsRouter.put("/:id");
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;

// Get >>
// http://localhost:5000/posts/authors

// Post >>
// http://localhost:5000/posts/createPost

// Delete >>
// http://localhost:5000/posts/:id