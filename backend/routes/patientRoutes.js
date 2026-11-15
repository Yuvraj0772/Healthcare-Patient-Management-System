const express = require("express");

const {
  addPatient,
  getPatients,
  getPatientById,
  searchPatients,
  updatePatient,
  deletePatient
} = require("../controllers/patientController");

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