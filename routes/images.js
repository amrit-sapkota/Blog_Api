const express = require("express");
const imageController = require("../controllers/imageUpload.controller");
const imageUploader = require("../helpers/image-uploader");
const checkAuthMiddleware = require("../middleware/check-auth");

// Initialize Router
const router = express.Router();

router.post(
  "/uploads",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  imageController.upload
);

module.exports = router;
