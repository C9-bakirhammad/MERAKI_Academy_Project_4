const postsModel = require("../models/post");

// create new post function >>
const createPost = (req, res) => {
  const { author, postText, postDate, postImage } = req.body;
  //  ! const author = req.token.userId;

  const newPost = new postsModel({
    author,
    postText,
    postImage,
    postDate,
  });
  newPost
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

// get posts by authorsId >>
const getPostsByAuthorId = (req, res) => {
  const { authorsId } = req.body;

  postsModel
    .find({ author: { $in: authorsId } })
    .populate({
      path: "author",
      select: "firstName lastName profileImage",
      /*   populate:[{  // !
            path: "commenter",
            select: ""
        }] */
    })
    .sort({ postDate: -1 })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Success",
        posts: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

// Delete post by postid >>
const deletePostById = (req, res) => {
  const { id } = req.params;
  postsModel
    .findOneAndDelete({ _id: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

module.exports = { createPost, getPostsByAuthorId, deletePostById };
