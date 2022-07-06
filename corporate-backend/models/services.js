const mongoose = require("mongoose");
const services = new mongoose.Schema(
  {
    images: [
      {
        img: {
          type: String,
        },
      },
    ],
    title: String,
    description: String,
    star: Number,
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: "building",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("services", services);
