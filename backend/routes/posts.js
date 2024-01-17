const express = require("express");
const postsRouter = express.Router();

// postsRouter on http://localhost:5000/posts

const {
  createPost,
  getUserPosts,
  getPostsByAuthorsId,
  deletePostById,
  updatePostById,
  addPostLikes,
  removePostLikes,
} = require("../controllers/posts");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

postsRouter.get("/authors", authentication, getPostsByAuthorsId);
postsRouter.get("/:author/posts", getUserPosts);
postsRouter.post(
  "/createPost",
  authentication,
  authorization("CREATE_POST"),
  createPost
);
postsRouter.put("/:id", updatePostById);
postsRouter.get(
  "/:postId/likes",
  authentication,
  authorization("LIKE"),
  addPostLikes
);
postsRouter.get(
  "/:postId/likes/remove",
  authentication,
  authorization("LIKE"),
  removePostLikes
);
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;

// Get >>
// http://localhost:5000/posts/authors
// http://localhost:5000/posts/:author/posts
// http://localhost:5000/posts/:postId/likes
// http://localhost:5000/posts/:postId/likes/remove

// Post >>
// http://localhost:5000/posts/createPost

// Put >>
// http://localhost:5000/posts/:id
//
// 

// Delete >>
// http://localhost:5000/posts/:id
