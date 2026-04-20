const express = require("express");
const admins = require("../Model/Admin");
const Catalog = require("../Model/Catalog");
const Orders = require("../Model/Orders");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAdminData = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await admins.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    if (password !== admin.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdminVerify = async (req, res) => {
  try {
    const adminUser = await admins.findById(req.user.id);

    if (!adminUser) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({
      user: adminUser,
      token: req.headers.authorization?.split(" ")[1],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadDesign = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      imageUrl,
      category,
      availableSizes,
      availableMaterials,
      popular,
    } = req.body;

    const newDesign = await Catalog.create({
      title,
      price,
      description,
      imageUrl,
      category,
      availableSizes,
      availableMaterials,
      popular,
    });

    res.json({ message: "Design uploaded successfully", data: newDesign });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getDesigns = async (req, res) => {
  try {
    const designs = await Catalog.find();
    res.status(200).json({ data: designs });
  } catch (err) {
    console.error("Error fetching designs:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDesign = await Catalog.findByIdAndDelete(id);
    if (!deletedDesign) {
      return res.status(404).json({ error: "Design not found" });
    }
    res
      .status(200)
      .json({ data: deletedDesign, message: "Design deleted successfully" });
  } catch (err) {
    console.error("Error deleting design:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      price,
      description,
      imageUrl,
      category,
      availableSizes,
      availableMaterials,
      popular,
    } = req.body;
    const update = await Catalog.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        imageUrl,
        category,
        availableSizes,
        availableMaterials,
        popular,
      },
      { returnDocument: "after" },
    );
    if (!update) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.json({ message: "Design updated successfully", data: update });
  } catch (err) {
    console.error("Error updating design:", err);
    res.status(500).json({ error: err.message });
  }
};

const filterDesigns = async (req, res) => {
  try {
    const { categories = [], sizes = [], sortBy = "newest" } = req.body;

    // Build query dynamically
    const query = {};
    if (categories.length > 0) query.category = { $in: categories };
    if (sizes.length > 0) query.availableSizes = { $in: sizes };

    // Decide sorting option
    let sortOption = {};
    switch (sortBy) {
      case "price-low":
        sortOption = { price: -1 }; // ascending
        break;
      case "price-high":
        sortOption = { price: 1 }; // descending
        break;
      case "popular":
        sortOption = { popular: 1 }; // true values first
        break;
      case "newest":
      default:
        sortOption = { createdAt: 1 }; // newest first
        break;
    }

    // Apply filters + sorting
    const designs = await Catalog.find(query).sort(sortOption);

    res.status(200).json({ success: true, data: designs });
  } catch (err) {
    console.error("Error fetching filtered designs:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    // Fetch orders and populate product details
    const orders = await Orders.find().populate("products");

    // Transform each order into the mockData shape
    const formattedOrders = orders.map((order, index) => {
      return {
        _id: order._id.toString(),
        orderId: `ORD-${String(index + 1).padStart(3, "0")}`, // generate readable orderId
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone,
        deliveryAddress: {
          street: order.customer.street,
          city: order.customer.district,
          postalCode: "N/A", // you can add postalCode if you store it
        },
        items: order.products.map((p) => ({
          ...p.toObject(),
          price: p.price, // assuming Catalog has a price field
        })),
        total: order.products.reduce((sum, p) => sum + (p.price || 0), 0),
        paymentMethod: order.payment.method,
        status: order.fulfillment.status,
        createdAt: order.createdAt,
      };
    });

    res.status(200).json({ data: formattedOrders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Orders.findByIdAndUpdate(
      id,
      { "fulfillment.status": status, updatedAt: new Date() },
      { returnDocument: "after" }, // ✅ updated option
    );

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json({ msg: "Order status updated", order });
  } catch (err) {
    res.status(500).json({
      msg: "An error occurred!",
      error: err.message,
    });

    console.error(err.message)
  }
};

module.exports = { updateStatus };

module.exports = {
  getAdminData,
  getAdminVerify,
  uploadDesign,
  updateDesign,
  getDesigns,
  deleteDesign,
  filterDesigns,
  getOrders,
  updateStatus,
};
