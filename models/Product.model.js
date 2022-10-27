const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
      unique: true,

    },
    description: {
      type: String,
      required: [true, "description is required."],
    },
    price: {
      type: Number,
      required: [true, "price is required."],
    },
    image_URL: {
      type: String,
      required: [true, "description is required."],
    },
    specs: {
      type: String,
      required: [true, "specs is required."],
    },
    review: {
      type: Number,
      required: [true, "review is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
