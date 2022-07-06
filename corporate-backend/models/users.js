const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: "building",
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    minimize: false,
  }
);
module.exports = mongoose.model("users", userSchema);
