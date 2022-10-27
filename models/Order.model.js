const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {

    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: Number
        }
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
