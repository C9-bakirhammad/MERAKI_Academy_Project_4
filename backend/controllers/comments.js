const commentsModel = require("../models/comment");
const postsModel = require("../models/post");

// create new comment and push to post >>
const createComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentsModel({
    commenter,
    comment,
  });
  newComment
    .save()
    .then((result) => {
      postsModel
        .findOneAndUpdate(
          { _id: id },
          {
            $push: { comments: result._id },
          },
          { new: true }
        )
        .then((post) => {
          res.status(201).json({
            success: true,
            message: "Comment added",
            comment: post,
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
        message: "Server error",
        err: err,
      });
    });
};

// delete comment by commentId and pull from post >>
const deleteCommentById = (req, res) => {
  const { id } = req.params;
  const { postId } = req.body;

  commentsModel
    .findOneAndDelete({ _id: id })
    .then((result) => {
      postsModel
        .findOneAndUpdate(
          { _id: postId },
          {
            $pull: { comments: id },
          }
        )
        .then((result) => {
          res.status(200).json({
            success: true,
            message: "Comment deleted",
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
        message: "Server error",
        err: err,
      });
    });
};

// update comment by id >>
const updateCommentById = (req, res) => {
  const { id } = req.params;
  const comment = req.body.comment;

  commentsModel
    .findOneAndUpdate({ _id: id }, { comment: comment }, { new: true })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment updated",
        comment: result,
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

module.exports = { createComment, deleteCommentById, updateCommentById };
