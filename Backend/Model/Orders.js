const mongoose = require("mongoose");
const crypto = require("crypto"); // built-in, no install needed

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true, trim: true, minlength: 2 },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^(97|98)[0-9]{8}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    street: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catalog",
      required: true,
    },
  ],
  payment: {
    method: {
      type: String,
      required: true,
      enum: ["cash", "card", "esewa", "khalti", "bank"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "failed"],
    },
    transactionId: {
      type: String,
      default: () => crypto.randomUUID(), // auto-generate UUID
    },
  },

  fulfillment: {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "shipped", "delivered", "cancelled"],
    },
    trackingNumber: {
      type: String,
      trim: true,
      default: () => crypto.randomUUID(), // auto-generate UUID
    },
  },

  visitorId: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
