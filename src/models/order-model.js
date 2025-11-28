const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const paymentInfoSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ["Credit Card", "PayPal", "Cash"],
  },
  status: { type: String, required: true, enum: ["Paid", "Pending", "Failed"] },
  transactionId: { type: String, required: true, unique: true },
  paidAt: { type: Date },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: [orderProductSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    address: { type: String },
    paymentInfo: paymentInfoSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
