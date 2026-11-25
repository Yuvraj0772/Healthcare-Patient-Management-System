const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    required: true,
    min: 0
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },

  contact: {
    phone: String,
    email: String
  },

  allergies: [String],

  medicalHistory: [
    {
      condition: String,
      diagnosedAt: Date
    }
  ],

  prescriptions: [
    {
      medication: String,
      dosage: String,
      frequency: String
    }
  ],
  visits: [
  {
    visitDate: {
      type: Date,
      default: Date.now
    },
    department: String,
    diagnosis: String,
    doctorName: String,
    notes: String
  }
],

  doctorNotes: [String]

}, { timestamps: true });

// Indexes for search optimization
// 

patientSchema.index({ name: 1 });

patientSchema.index({
  "medicalHistory.condition": 1
});

patientSchema.index({
  "visits.visitDate": -1
});

// patientSchema.index({
//   "medicalHistory.condition": 1,
//   "visits.visitDate": -1
// });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;