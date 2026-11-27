
import { useState } from "react";
import { updatePatient } from "../services/api";

function EditPatient({ patient, onCancel, onPatientUpdated }) {
  const [formData, setFormData] = useState({
    patientId: patient.patientId || "",
    name: patient.name || "",
    age: patient.age || "",
    gender: patient.gender || "",
    phone: patient.contact?.phone || "",
    allergies: patient.allergies?.join(", ") || "",
    medicalHistory:
      patient.medicalHistory?.map((item) => item.condition).join(", ") || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

  const updatedData = {
  set: {
    name: formData.name,
    age: Number(formData.age),
    gender: formData.gender,
    contact: {
      ...patient.contact,
      phone: formData.phone,
    },
    allergies: formData.allergies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    medicalHistory: formData.medicalHistory
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((condition) => ({ condition })),
  },
};
  

    try {
      await updatePatient(patient._id, updatedData);
      onPatientUpdated();
    } catch (err) {
      setError(err.message || "Failed to update patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-patient-page">
      <div className="add-patient-container">
        <h1>Edit Patient</h1>
        <p>Update patient information and medical records.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Allergies (comma separated)</label>
            <input
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="e.g. Penicillin, Dust"
            />
          </div>

          <div className="form-group">
            <label>Medical History (comma separated conditions)</label>
            <input
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              placeholder="e.g. Diabetes, Asthma"
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPatient;
