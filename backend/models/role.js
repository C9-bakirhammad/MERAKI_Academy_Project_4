const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: [{ type: String, require: true }],
});

module.exports = mongoose.model("Role", roleSchema);
