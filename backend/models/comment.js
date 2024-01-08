const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, required: true },
  commentDate: { type:Date, default: Date.now() },
});

module.exports = mongoose.model("Comment", commentSchema);
