const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const getAdminData = require("../Controllers/adminLogin").getAdminData;
const getAdminVerify = require("../Controllers/adminLogin").getAdminVerify;
const uploadDesign = require("../Controllers/adminLogin").uploadDesign;
const getDesigns = require("../Controllers/adminLogin").getDesigns;
const deleteDesign = require("../Controllers/adminLogin").deleteDesign;
const updateDesign = require("../Controllers/adminLogin").updateDesign;
const filterDesigns = require("../Controllers/adminLogin").filterDesigns;
const { setOrders } = require("../Controllers/order");
const getOrders = require("../Controllers/adminLogin").getOrders;
const { updateStatus } = require("../Controllers/adminLogin");
const { customOrder } = require("../Controllers/order");
const {getCustomOrders}=require('../Controllers/order');
const {updateCustomStatus}=require('../Controllers/order');

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Create a unique name: originalname + timestamp
    const ext = path.extname(file.originalname); // file extension (.jpg, .png, etc.)
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.route("/admin/login").post(getAdminData);
router.route("/admin/verify").get(authMiddleware, getAdminVerify);
router.route("/admin/uploadDesign").post(uploadDesign);
router.route("/admin/getDesigns").get(getDesigns);
router.route("/admin/deleteDesign/:id").delete(deleteDesign);
router.route("/admin/updateDesign/:id").put(updateDesign);
router.route("/admin/getOrders").get(getOrders);
router.route("/filterDesigns").post(filterDesigns);
router.route("/setOrders").post(setOrders);
router.route("/custom-order").post(upload.single("designFile"),customOrder);
router.route("/admin/updateStatus/:id").put(updateStatus);
router.route('/updateCustomStatus/:id').put(updateCustomStatus)
router.route('/getCustomOrders').get(getCustomOrders)
module.exports = router;
