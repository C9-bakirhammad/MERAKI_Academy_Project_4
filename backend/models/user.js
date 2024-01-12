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
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  },
  coverImage: {
    type: String,
    default:
      "https://theoheartist.com/wp-content/uploads/sites/2/2015/01/fbdefault.png",
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
