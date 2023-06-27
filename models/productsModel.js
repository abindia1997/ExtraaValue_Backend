const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    model: {
      type: String,
      require: true,
    },

    minPrice: {
      type: Number,
      require: true,
      min: 0,
    },
    maxPrice: {
      type: Number,
      require: true,
      min: 0,
    },
    image: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productsSchema);

module.exports = Product;