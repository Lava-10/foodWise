const express = require("express");
const {
  getSignedUrl,
} = require("../../controllers/elevenLabController.js");
const router = express.Router();

router.get("/get-signed-url", getSignedUrl);

module.exports = router;
