const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, required: true },
  commentDate: { timestamps: true },
});

module.exports = mongoose.model("Comment", commentSchema);
