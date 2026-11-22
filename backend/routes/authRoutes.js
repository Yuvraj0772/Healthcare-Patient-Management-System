const express = require("express");
const { registerStaff } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerStaff);

module.exports = router;