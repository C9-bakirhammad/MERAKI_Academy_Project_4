const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  birthDate: { type: Date, required: true },
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  profileImage: {
    type: String,
    default:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg",
  },
  coverImage: {
    type: String,
    default:
      "https://live.staticflickr.com/4014/4655912209_0f7c1b8173_h.jpg",
  },
  photos: [{ type: String }],
  myPages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
  likedPages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
  searchFname: { type: String },
  searchLname: { type: String },
  // savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  /*  notification: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      action: { type: String },
    },
  ], */
});

// pre Middleware for register .save()
userSchema.pre("save", async function () {
  this.email = this.email.split(" ").join("").toLowerCase();
  this.country = this.country.toLowerCase();
  this.searchFname = this.firstName.toLowerCase();
  this.searchLname = this.lastName.toLowerCase();

  this.password = await bcrypt.hash(this.password, 11);
});

module.exports = mongoose.model("User", userSchema);
