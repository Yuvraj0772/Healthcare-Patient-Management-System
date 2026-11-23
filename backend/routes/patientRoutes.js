const express = require("express");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get("/search", protect, searchPatients);
router.post("/", protect, addPatient);
router.get("/", protect, getPatients);
router.patch("/:id", protect, updatePatient);
router.delete("/:id", protect, authorizeRoles("admin"), deletePatient);
router.get("/:id", protect, getPatientById); 



const router = express.Router();

// Search route must come before /:id
router.get("/search", searchPatients);

// Create patient
router.post("/", addPatient);

// Get all patients
router.get("/", getPatients);

// Update patient
router.patch("/:id", updatePatient);

// Delete patient
router.delete("/:id", deletePatient);

// Get patient by ID
router.get("/:id", getPatientById);

module.exports = router;