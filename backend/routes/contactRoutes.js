const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getContactMessages,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(createContactMessage).get(protect, admin, getContactMessages);

module.exports = router;
