const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatients,
} = require("../controllers/patientController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Search patients
router.get("/search", protect, searchPatients);

// Add patient
router.post("/", protect, addPatient);

// Get all patients
router.get("/", protect, getPatients);

// Get patient by ID
router.get("/:id", protect, getPatientById);

// Update patient
router.patch("/:id", protect, updatePatient);

// Delete patient (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deletePatient);

module.exports = router;