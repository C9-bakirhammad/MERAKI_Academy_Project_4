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
    .populate("author", "firstName lastName profileImage")
    .populate({
      path: "comments",
      populate: [
        {
          path: "commenter",
          select: "firstName lastName profileImage",
        },
      ],
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

// Update post by postid >>
const updatePostById = (req, res) => {
  const { id } = req.params;
  const { postText } = req.body;

  postsModel
    .findOneAndUpdate({ _id: id }, { postText })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Post updated",
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
// todo >> Function of (model.delete.resulte(model.update))post image

// update (add or remove) likes of post >>
const updateLikesByPostId = (req, res) => {
  const { postId } = req.params;
  const liker = req.body.liker; // ! edit from token
  const { isLike } = req.body;

  if (isLike) {
    return postsModel // * add to Likes
      .findOneAndUpdate({ _id: postId }, { $push: { likes: liker } })
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: "Post Not Found",
          });
        }
        res.status(200).json({
          success: true,
          message: "Like added",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
          err: err,
        });
      });
  }

  postsModel // * remove from Likes
    .findOneAndUpdate({ _id: postId }, { $pull: { likes: liker } })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Like removed",
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

// get all Likes of post >>
const getPostLikes = (req, res) => {
  const { id } = req.params;

  postsModel
    .findOne({ _id: id }, "likes")
    .populate("likes", "firstName lastName profileImage -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Post Found",
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

module.exports = {
  createPost,
  getPostsByAuthorId,
  deletePostById,
  updatePostById,
  updateLikesByPostId,
  getPostLikes,
};
