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

postsRouter.put("/authors", authentication, getPostsByAuthorsId);
postsRouter.get("/:author/posts", getUserPosts);
postsRouter.post(
  "/createPost",
  authentication,
  authorization("CREATE_POST"),
  createPost
);
postsRouter.put("/:id", updatePostById);
postsRouter.put(
  "/:postId/likes",
  authentication,
  authorization("LIKE"),
  addPostLikes
);
postsRouter.put(
  "/:postId/likes/remove",
  authentication,
  authorization("LIKE"),
  removePostLikes
);
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;

// Get >>
// http://localhost:5000/posts/:author/posts

// Post >>
// http://localhost:5000/posts/createPost

// Put >>
// http://localhost:5000/posts/authors
// http://localhost:5000/posts/:id
// http://localhost:5000/posts/:postId/likes
// http://localhost:5000/posts/:postId/likes/remove

// Delete >>
// http://localhost:5000/posts/:id
