const postsModel = require("../models/post");
const usersModel = require("../models/user");

// create new post function >>
const createPost = (req, res) => {
  const { postText, postDate, postImage, likes } = req.body;
  const author = req.token.userId;

  const newPost = new postsModel({
    author,
    postText,
    postImage,
    postDate: Date.now(),
    likes,
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

//  get one user posts >>
const getUserPosts = (req, res) => {
  const { author } = req.params;
  postsModel
    .find({ author: author })
    .populate("author", "firstName lastName profileImage")
    .populate("likes", "firstName lastName profileImage -_id")
    .populate({
      path: "comments",
      populate: [
        {
          path: "commenter",
          select: "firstName lastName profileImage -_id",
        },
      ],
    })
    .sort({ postDate: -1 })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Posts for the user",
          result: result,
        });
      }
      res.status(200).json({
        success: true,
        message: "Success",
        posts: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// get posts by authorsId (friends) >>
const getPostsByAuthorsId = (req, res) => {
  const authorsId = req.body.authorsId;
  const userId = req.token.userId;
  postsModel
    .find({ author: { $in: [...authorsId, userId] } })
    .populate("author", "firstName lastName profileImage")
    .populate("likes", "firstName lastName profileImage -_id")
    .populate({
      path: "comments",
      populate: [
        {
          path: "commenter",
          select: "firstName lastName profileImage -_id",
        },
      ],
    })
    .sort({ postDate: -1 })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Posts yet",
          result: result,
        });
      }
      res.status(200).json({
        success: true,
        message: "Success",
        userId: userId,
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

// update (add) likes to post and user(liker)>>
const addPostLikes = (req, res) => {
  const postId = req.params.postId;
  const liker = req.token.userId;

  postsModel // * add Like to the post
    .findOneAndUpdate({ _id: postId }, { $push: { likes: liker } })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
      usersModel // * add like to the user
        .findOneAndUpdate({ _id: liker }, { $push: { likedPosts: postId } })
        .then((result) => {
          res.status(201).json({
            success: true,
            message: "Like Added successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Server error",
            err: err,
          });
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

// update (remove) likes from post and user(liker)>>
const removePostLikes = (req, res) => {
  const { postId } = req.params;
  const liker = req.token.userId;

  postsModel // * remove Like from the post
    .findOneAndUpdate({ _id: postId }, { $pull: { likes: liker } })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
      usersModel // * remove like from user
        .findOneAndUpdate({ _id: liker }, { $pull: { likedPosts: postId } })
        .then((result) => {
          res.status(201).json({
            success: true,
            message: "Like Removed successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Server error",
            err: err,
          });
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
  getUserPosts,
  getPostsByAuthorsId,
  deletePostById,
  updatePostById,
  addPostLikes,
  removePostLikes,
};
