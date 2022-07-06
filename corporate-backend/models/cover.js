const mongoose = require("mongoose");
const cover = new mongoose.Schema(
  {
    img: { type: String },
    text: { type: String },
    buildingId: {
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
module.exports = mongoose.model("cover", cover);
10;
