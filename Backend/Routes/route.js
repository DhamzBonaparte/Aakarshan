const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const getAdminData = require("../Controllers/adminLogin").getAdminData;
const getAdminVerify = require("../Controllers/adminLogin").getAdminVerify;
const uploadDesign = require("../Controllers/adminLogin").uploadDesign;
const getDesigns = require("../Controllers/adminLogin").getDesigns;
const deleteDesign = require("../Controllers/adminLogin").deleteDesign;
const updateDesign = require("../Controllers/adminLogin").updateDesign;

// router.route('/getCatalogs').get(getCatalog)
router.route('/admin/login').post(getAdminData)
router.route('/admin/verify').get(authMiddleware, getAdminVerify)
router.route('/admin/uploadDesign').post(uploadDesign)
router.route('/admin/getDesigns').get(getDesigns)
router.route('/admin/deleteDesign/:id').delete(deleteDesign)
router.route('/admin/updateDesign/:id').put(updateDesign)
module.exports = router;
