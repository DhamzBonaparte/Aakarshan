const express = require("express");
const admins = require("../Model/Admin");
const Catalog = require("../Model/Catalog");
const Orders = require("../Model/Orders");
const jwt = require("jsonwebtoken");
const custom = require("../Model/Custom");
require("dotenv").config();

const setOrders = async (req, res) => {
  try {
    const { customer, products, payment, visitorId } = req.body;
    const order = new Orders({ customer, products, payment, visitorId });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Order creation failed:", error); // log full error
    res.status(500).json({ error: error.message });
  }
};
const customOrder = async (req, res) => {
  try {
    // Multer gives you the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;

    // Create and save a new custom order
    const newOrder = await custom.create({
      customer: {
        name: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        street: req.body.landmarks,
        district: req.body.address,
      },
      product: {
        title: "Custom Design",
        description: "Personalized print",
        imageUrl: fileUrl,
        canvasSize: req.body.canvasSize,
        material: req.body.material,
        price: req.body.price,
      },
      payment: {
        method: req.body.paymentMethod.toLowerCase(),
        status: "pending",
      },
      fulfillment: {
        status: "pending",
      },
      visitorId: req.body.visitorId || "",
    });

    // Format response for frontend
    const orderData = {
      _id: newOrder._id.toString(),
      orderId: `CUST-${newOrder._id.toString().slice(-6)}`, // readable ID
      customerName: newOrder.customer.name,
      customerEmail: newOrder.customer.email,
      customerPhone: newOrder.customer.phone,
      deliveryAddress: {
        street: newOrder.customer.street,
        city: newOrder.customer.district,
        postalCode: "N/A",
      },
      items: {
        title: newOrder.product.title,
        description: newOrder.product.description,
        canvasSize: newOrder.product.canvasSize,
        material: newOrder.product.material,
        imageUrl: newOrder.product.imageUrl,
        price: newOrder.product.price,
      },
      total: newOrder.product.price,
      paymentMethod: newOrder.payment.method,
      status: newOrder.fulfillment.status,
      createdAt: newOrder.createdAt,
    };

    res.status(201).json({ data: orderData });
  } catch (err) {
    console.error("Custom order creation failed:", err);
    res.status(500).json({ error: err.message });
  }
};

const getCustomOrders = async (req, res) => {
  try {
    // Fetch all custom orders
    const orders = await custom.find();

    // Format each order for frontend
    const formattedOrders = orders.map((order, index) => ({
      _id: order._id.toString(),
      orderId: `CUST-${String(index + 1).padStart(3, "0")}`,
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      customerPhone: order.customer.phone,
      deliveryAddress: {
        street: order.customer.street,
        city: order.customer.district,
        postalCode: "N/A",
      },
      item: {
        title: order.product.title,
        description: order.product.description,
        canvasSize: order.product.canvasSize,
        material: order.product.material,
        imageUrl: order.product.imageUrl,
        price: order.product.price,
      },
      total: order.product.price,
      paymentMethod: order.payment.method,
      status: order.fulfillment.status,
      createdAt: order.createdAt,
    }));

    res.status(200).json({ data: formattedOrders });
  } catch (err) {
    console.error("Error fetching custom orders:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateCustomStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status against allowed enum
    const allowedStatuses = [
      "pending",
      "in-progress",
      "printing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    // Find and update the order
    const updatedOrder = await custom.findByIdAndUpdate(
      id,
      { "fulfillment.status": status, updatedAt: Date.now() },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json({
      msg: "Order status updated successfully",
      data: {
        _id: updatedOrder._id,
        orderId: `CUST-${updatedOrder._id.toString().slice(-6)}`,
        status: updatedOrder.fulfillment.status,
        customerName: updatedOrder.customer.name,
        customerEmail: updatedOrder.customer.email,
        customerPhone: updatedOrder.customer.phone,
        deliveryAddress:
          updatedOrder.customer.street + ", " + updatedOrder.customer.district,
        product: updatedOrder.product,
        paymentMethod: updatedOrder.payment.method,
        total: updatedOrder.product.price,
        createdAt: updatedOrder.createdAt,
        updatedAt: updatedOrder.updatedAt,
      },
    });
  } catch (err) {
    console.error("Error updating custom order status:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { updateCustomStatus };

module.exports = {
  setOrders,
  customOrder,
  getCustomOrders,
  updateCustomStatus,
};
