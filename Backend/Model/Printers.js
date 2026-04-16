const mongoose = require("mongoose");

const printerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Printer name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
  },
  contactPerson: {
    type: String,
    required: [true, "Contact person is required"],
    trim: true,
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
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  capabilities: {
    materials: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one material capability must be provided",
      },
    },
    sizes: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one size capability must be provided",
      },
    },
  },
  baseRates: {
    canvas: { type: Number, min: [0, "Rate must be positive"] },
    vinyl: { type: Number, min: [0, "Rate must be positive"] },
    photoPaper: { type: Number, min: [0, "Rate must be positive"] },
  },
  deliveryOptions: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "At least one delivery option must be provided",
    },
  },
}, { timestamps: true }); // auto-manages createdAt and updatedAt

module.exports = mongoose.model("Printer", printerSchema);
