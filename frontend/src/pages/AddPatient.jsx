
import { useState } from "react";
import { addPatient } from "../services/api";

function AddPatient({ onPatientAdded, onCancel }) {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    gender: "",
    contact: { phone: "" },
    allergies: "",
    medicalHistory: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, phone: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const patientData = {
      ...formData,
      age: Number(formData.age),
      allergies: formData.allergies
        ? formData.allergies.split(",").map((item) => item.trim())
        : [],
      medicalHistory: formData.medicalHistory
        ? [{ condition: formData.medicalHistory.trim() }]
        : [],
    };

    try {
      const result = await addPatient(patientData);
      onPatientAdded(result.data || result.patient);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-patient-page">

      <button className="form-back-btn" type="button" onClick={onCancel}>
        <span>←</span> Back to Dashboard
      </button>

      <div className="add-patient-header">
        <div>
          <span className="dashboard-eyebrow">PATIENT MANAGEMENT</span>
          <h1>Add New Patient</h1>
          <p>Enter patient information to create a medical record.</p>
        </div>
      </div>

      <form className="add-patient-form" onSubmit={handleSubmit}>

        {/* Basic Information */}
        <div className="form-section">
          <div className="form-section-heading">
            <div className="form-section-icon">♙</div>
            <div>
              <h2>Personal Information</h2>
              <p>Basic details and contact information</p>
            </div>
          </div>

          <div className="form-fields-grid">
            <div className="form-group">
              <label>Patient ID <span>*</span></label>
              <input
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="e.g. PAT001"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name <span>*</span></label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Age <span>*</span></label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender <span>*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.contact.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <div className="form-section-heading">
            <div className="form-section-icon">✚</div>
            <div>
              <h2>Medical Information</h2>
              <p>Allergies and medical history</p>
            </div>
          </div>

          <div className="form-fields-grid">

            <div className="form-group full-width">
              <label>Known Allergies</label>
              <input
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="e.g. Dust, Penicillin (comma separated)"
              />
              <small>Separate multiple allergies using commas.</small>
            </div>

            <div className="form-group full-width">
              <label>Medical History / Condition</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Describe existing conditions, medical history or diagnosis..."
                rows="5"
              />
            </div>

          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving Patient..." : "＋ Save Patient"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddPatient;
