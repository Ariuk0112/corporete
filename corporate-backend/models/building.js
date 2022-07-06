const mongoose = require("mongoose");
const building = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    name: { type: String },
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
module.exports = mongoose.model("building", building);
