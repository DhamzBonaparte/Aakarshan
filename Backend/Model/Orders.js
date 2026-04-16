const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: [true, "Order ID is required"],
    trim: true,
  },
  customer: {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    deliveryAddress: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, "Postal code must be at least 4 characters"],
      },
    },
  },
  product: {
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Design",
      required: true,
    },
    customSize: { type: String, trim: true },
    customImageUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/, "Invalid image URL"],
    },
    material: { type: String, required: true, trim: true },
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
    transactionId: { type: String, trim: true },
  },
  fulfillment: {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "shipped", "delivered", "cancelled"],
    },
    printerId: { type: mongoose.Schema.Types.ObjectId, ref: "Printer" },
    trackingNumber: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const orders = mongoose.model("Orders", orderSchema);
module.exports = orders;
