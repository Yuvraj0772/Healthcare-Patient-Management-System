const Patient = require("../models/patient");

// Add new patient
const addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      data: patient
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const searchPatients = async (req, res) => {
  const {
  keyword,
  condition,
  conditions,
  visitDate,
  page = 1,
  limit = 5
} = req.query;
// Search multiple medical conditions
if (conditions) {
  const conditionList = conditions
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  query["medicalHistory.condition"] = {
    $in: conditionList
  };
}
  try {
    const {
      keyword,
      condition,
      visitDate,
      page = 1,
      limit = 5
    } = req.query;

    const query = {};

    // Search by patient ID or name
    if (keyword) {
      query.$or = [
        { patientId: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } }
      ];
    }

    // Search by medical condition
    if (condition) {
      query["medicalHistory.condition"] = {
        $regex: condition,
        $options: "i"
      };
    }

    // Search by visit date
    if (visitDate) {
      const start = new Date(visitDate);

      if (Number.isNaN(start.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid visit date"
        });
      }

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      query["visits.visitDate"] = {
        $gte: start,
        $lt: end
      };
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(50, Math.max(1, Number(limit) || 5));

    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const total = await Patient.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      data: patients
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update patient
const updatePatient = async (req, res) => {
  try {
    const {
      set,
      addMedicalHistory,
      addPrescription,
      addVisit,
      addAllergy,
      addDoctorNote,
      removeAllergy
    } = req.body;

    const update = {};

    // Update existing fields
    const allowedFields = ["name", "age", "gender", "contact"];

    if (set) {
      const safeFields = {};

      for (const field of allowedFields) {
        if (Object.hasOwn(set, field)) {
          safeFields[field] = set[field];
        }
      }

      if (Object.keys(safeFields).length) {
        update.$set = safeFields;
      }
    }

    // Add medical history
    if (addMedicalHistory) {
      update.$push = {
        ...update.$push,
        medicalHistory: addMedicalHistory
      };
    }

    // Add prescription
    if (addPrescription) {
      update.$push = {
        ...update.$push,
        prescriptions: addPrescription
      };
    }

    // Add visit record
    if (addVisit) {
      update.$push = {
        ...update.$push,
        visits: addVisit
      };
    }

    // Add allergy without duplicates
    if (addAllergy) {
      update.$addToSet = {
        allergies: addAllergy
      };
    }

    // Add doctor note
    if (addDoctorNote) {
      update.$push = {
        ...update.$push,
        doctorNotes: addDoctorNote
      };
    }

    // Remove allergy
    if (removeAllergy) {
      update.$pull = {
        allergies: removeAllergy
      };
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid update fields provided"
      });
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      update,
      {
        new: true,
        runValidators: true
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete patient
const deletePatient = async (req, res) => {
  try {
    const { confirm } = req.body;

    if (confirm !== true) {
      return res.status(400).json({
        success: false,
        message: "Please confirm patient deletion"
      });
    }

    const patient = await Patient.findByIdAndDelete(
      req.params.id
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatients
};


