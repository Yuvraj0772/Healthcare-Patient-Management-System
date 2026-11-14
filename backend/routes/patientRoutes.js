const express = require("express");

const {
  addPatient,
  getPatients,
  getPatientById
} = require("../controllers/patientControllers");

const router = express.Router();

router.post("/", addPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);

module.exports = router;