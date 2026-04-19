const express = require("express");
const admins = require("../Model/Admin");
const Catalog = require("../Model/Catalog");
const Orders = require("../Model/Orders");
const jwt = require("jsonwebtoken");
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


module.exports = {
  setOrders,
};
