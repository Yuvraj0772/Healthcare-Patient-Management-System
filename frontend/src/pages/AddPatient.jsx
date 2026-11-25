import { useState } from "react";
import { addPatient } from "../services/api";

function AddPatient({ onPatientAdded, onCancel }) {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    gender: "",
    contact: {
      phone: "",
    },
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
        contact: {
          ...prev.contact,
          phone: value,
        },
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
        ? [
            {
              condition: formData.medicalHistory.trim(),
            },
          ]
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
      <div className="add-patient-header">
        <h1>Add New Patient</h1>
        <p>Enter patient details below</p>
      </div>

      <form className="add-patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID</label>
          <input
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            placeholder="e.g. PAT001"
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Patient full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            min="0"
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
            placeholder="Phone number"
          />
        </div>

        <div className="form-group">
          <label>Allergies</label>
          <input
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="e.g. Dust, Penicillin (comma separated)"
          />
        </div>

        <div className="form-group full-width">
          <label>Medical History / Condition</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Enter medical condition"
            rows="4"
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Patient"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPatient;