const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    trim: true,
    match: [/^https?:\/\/.+/, "Please provide a valid image URL"],
  },
  availableSizes: {
    type: [String],
    required: true,
    validate: {
      validator: function (sizes) {
        return sizes.length > 0;
      },
      message: "At least one size must be provided",
    },
  },
  availableMaterials: {
    type: [String],
    required: true,
    validate: {
      validator: function (materials) {
        return materials.length > 0;
      },
      message: "At least one material must be provided",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: [String], // array of strings
    required: [true, "At least one category is required"],
    validate: {
      validator: function (categories) {
        return categories.length > 0;
      },
      message: "At least one category must be provided",
    },
  },
  popular: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Catalog", designSchema);
