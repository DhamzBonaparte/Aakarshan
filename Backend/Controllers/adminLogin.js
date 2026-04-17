const express = require("express");
const admins = require("../Model/Admin");
const Catalog = require("../Model/Catalog");
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
    const         {
          title,
          price,
          description,
          imageUrl,
          category,
          availableSizes,
          availableMaterials,
          popular,
        } = req.body;
    const update = await Catalog.findByIdAndUpdate(id, {
      title,
      price,
      description,
      imageUrl,
      category,
      availableSizes,
      availableMaterials, 
      popular,
    },{returnDocument: 'after'});
     if (!update) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.json({ message: "Design updated successfully", data: update });
  } catch (err) {
    console.error("Error updating design:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAdminData,
  getAdminVerify,
  uploadDesign,
  updateDesign,
  getDesigns,
  deleteDesign,
};
