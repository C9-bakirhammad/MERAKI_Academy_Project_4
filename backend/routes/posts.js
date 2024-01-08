const express = require("express");
const postsRouter = express.Router();

// postsRouter on http://localhost:5000/posts

const {
  createPost,
  getPostsByAuthorId,
  deletePostById,
  updatePostById,
  updateLikesByPostId,
  getPostLikes
} = require("../controllers/posts");

const authentication = require("../middleware/authentication")

postsRouter.get("/authors", getPostsByAuthorId);
postsRouter.get("/:id/likes", getPostLikes);
postsRouter.post("/createPost",authentication, createPost);
postsRouter.put("/:id", updatePostById);
postsRouter.put("/:postId/likes", updateLikesByPostId);
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;

// Get >>
// http://localhost:5000/posts/authors
// http://localhost:5000/posts/:id/likes

// Post >>
// http://localhost:5000/posts/createPost

// Put >>
// http://localhost:5000/posts/:id
// http://localhost:5000/posts/:postId/likes

// Delete >>
// http://localhost:5000/posts/:id
