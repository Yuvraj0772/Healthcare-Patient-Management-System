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

  doctorNotes: [String]

}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);