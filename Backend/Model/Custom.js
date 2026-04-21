const mongoose = require("mongoose");
const crypto = require("crypto");

const customOrderSchema = new mongoose.Schema({
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

  // Custom product details embedded directly
  product: {
    title: { type: String, default: "Custom Design" },
    description: { type: String, default: "Personalized print" },
    imageUrl: {
      type: String,
      required: true,
      match: [/^(https?:\/\/.+|\/uploads\/.+)$/, "Please provide a valid image URL"],
    },
    canvasSize: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
  },

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
      default: () => crypto.randomUUID(),
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
      default: () => crypto.randomUUID(),
    },
  },

  visitorId: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const CustomOrders = mongoose.model("CustomOrders", customOrderSchema);
module.exports = CustomOrders;
