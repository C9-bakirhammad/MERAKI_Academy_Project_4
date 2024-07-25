const express = require("express");
const postsRouter = express.Router();

// postsRouter on https://sky-pwcy.onrender.com/posts

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
// https://sky-pwcy.onrender.com/posts/authors
// https://sky-pwcy.onrender.com/posts/:author/posts
// https://sky-pwcy.onrender.com/posts/:postId/likes
// https://sky-pwcy.onrender.com/posts/:postId/likes/remove

// Post >>
// https://sky-pwcy.onrender.com/posts/createPost

// Put >>
// https://sky-pwcy.onrender.com/posts/:id
//
// 

// Delete >>
// https://sky-pwcy.onrender.com/posts/:id
