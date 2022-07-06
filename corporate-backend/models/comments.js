const mongoose = require("mongoose");
const comment = new mongoose.Schema(
  {
    name: { type: String },
    text: { type: String },
    star: { type: Number },
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
module.exports = mongoose.model("comment", comment);
