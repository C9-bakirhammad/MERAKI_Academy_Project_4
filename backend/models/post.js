const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postText: { type: String, required: true },
  postDate: { timestamps: true },
  postImage: [{ type: String }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likeNumber: { type: Number },
});

module.exports = mongoose.model("Post", postSchema);
