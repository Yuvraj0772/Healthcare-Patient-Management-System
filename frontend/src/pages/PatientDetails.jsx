function PatientDetails({ patient, onBack }) {
  if (!patient) return null;

  return (
    <div className="patient-details-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="patient-details-header">
        <div>
          <h1>{patient.name}</h1>
          <p>Patient ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="details-section">
        <h2>Personal Information</h2>
        <div className="details-grid">
          <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
          <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
          <p><strong>Phone:</strong> {patient.contact?.phone || "N/A"}</p>
        </div>
      </div>

      <div className="details-section">
        <h2>Allergies</h2>
        {patient.allergies?.length ? (
          <ul>
            {patient.allergies.map((allergy, index) => (
              <li key={index}>{allergy}</li>
            ))}
          </ul>
        ) : (
          <p>No allergies recorded.</p>
        )}
      </div>

      <div className="details-section">
        <h2>Medical History</h2>
        {patient.medicalHistory?.length ? (
          <ul>
            {patient.medicalHistory.map((item, index) => (
              <li key={index}>
                <strong>{item.condition || "Condition"}</strong>
                {item.notes && <p>{item.notes}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No medical history recorded.</p>
        )}
      </div>

      <div className="details-section">
        <h2>Prescriptions</h2>
        {patient.prescriptions?.length ? (
          <ul>
            {patient.prescriptions.map((item, index) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : item.medication || item.name || JSON.stringify(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No prescriptions recorded.</p>
        )}
      </div>

      <div className="details-section">
        <h2>Doctor Notes</h2>
        {patient.doctorNotes?.length ? (
          <ul>
            {patient.doctorNotes.map((note, index) => (
              <li key={index}>
                {typeof note === "string"
                  ? note
                  : note.note || note.text || JSON.stringify(note)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctor notes recorded.</p>
        )}
      </div>

      <div className="details-section">
        <h2>Visit History</h2>
        {patient.visits?.length ? (
          <ul>
            {patient.visits.map((visit, index) => (
              <li key={index}>
                <p><strong>Date:</strong> {visit.visitDate ? new Date(visit.visitDate).toLocaleDateString() : "N/A"}</p>
                <p><strong>Department:</strong> {visit.department || "N/A"}</p>
                <p><strong>Diagnosis:</strong> {visit.diagnosis || "N/A"}</p>
                <p><strong>Doctor:</strong> {visit.doctorName || "N/A"}</p>
                {visit.notes && <p><strong>Notes:</strong> {visit.notes}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No visits recorded.</p>
        )}
      </div>
    </div>
  );
}

export default PatientDetails;