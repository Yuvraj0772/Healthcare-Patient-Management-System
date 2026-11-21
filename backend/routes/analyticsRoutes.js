const express = require("express");

const {
  patientsPerCondition,
  mostPrescribedMedications,
  averageAgePerDepartment,
  visitsPerMonth
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/conditions", patientsPerCondition);
router.get("/medications", mostPrescribedMedications);
router.get("/department-age", averageAgePerDepartment);
router.get("/monthly-visits", visitsPerMonth);

module.exports = router;