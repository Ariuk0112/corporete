const mongoose = require("mongoose");
const rooms = new mongoose.Schema(
  {
    images: [
      {
        img: {
          type: String,
        },
      },
    ],

    name: { type: String },
    title: { type: String },
    price: { type: String },
    type: { type: String },
    star: { type: Number },
    description: String,
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
module.exports = mongoose.model("rooms", rooms);
