const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "Order reference is required"],
  },
  method: {
    type: String,
    required: [true, "Payment method is required"],
    trim: true,
    enum: ["cash", "card", "esewa", "khalti", "bank"], // restrict to valid methods
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "failed", "refunded"],
  },
  transactionId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true, // allows null values without violating uniqueness
  },
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
    min: [0, "Amount must be a positive number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
