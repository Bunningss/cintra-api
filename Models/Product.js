const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Images: {
    type: Array,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Discount: {
    type: Number,
  },
  Description: {
    type: String,
    required: true,
  },
  Sizes: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("products", productSchema);
