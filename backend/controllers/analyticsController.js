//const Patient = require('.models/Patient');
const Patient = require("../models/Patient");


const patientsPerCondition = async (req, res) => {
  try {
    const result = await Patient.aggregate([
      { $unwind: "$medicalHistory" },

      {
        $group: {
          _id: "$medicalHistory.condition",
          totalPatients: { $sum: 1 }
        }
      },

      { $sort: { totalPatients: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const mostPrescribedMedications = async (req, res) => {
  try {
    const result = await Patient.aggregate([
      { $unwind: "$prescriptions" },

      {
        $group: {
          _id: "$prescriptions.medication",
          totalPrescriptions: { $sum: 1 }
        }
      },

      { $sort: { totalPrescriptions: -1 } },

      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const averageAgePerDepartment = async (req, res) => {
  try {
    const result = await Patient.aggregate([
      { $unwind: "$visits" },

      {
        $group: {
          _id: "$visits.department",
          averageAge: { $avg: "$age" },
          totalPatients: { $sum: 1 }
        }
      },

      {
        $project: {
          department: "$_id",
          averageAge: { $round: ["$averageAge", 2] },
          totalPatients: 1,
          _id: 0
        }
      },

      { $sort: { averageAge: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const visitsPerMonth = async (req, res) => {
  try {
    const result = await Patient.aggregate([
      { $unwind: "$visits" },

      {
        $group: {
          _id: {
            year: { $year: "$visits.visitDate" },
            month: { $month: "$visits.visitDate" }
          },
          totalVisits: { $sum: 1 }
        }
      },

      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalVisits: 1,
          _id: 0
        }
      },

      { $sort: { year: 1, month: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  patientsPerCondition,
  mostPrescribedMedications,
  averageAgePerDepartment,
  visitsPerMonth
};