const express = require("express");

const {
  registerStaff,
  loginStaff,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerStaff);
router.post("/login", loginStaff);

module.exports = router;

