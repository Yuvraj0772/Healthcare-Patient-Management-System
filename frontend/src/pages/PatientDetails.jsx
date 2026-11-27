
function PatientDetails({ patient, onBack, onEdit }) {
  if (!patient) return null;

  return (
    <div className="patient-details-page">

      {/* Back Button */}
      <button className="patient-details-back" onClick={onBack}>
        <span>←</span> Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="patient-profile-banner">
        <div className="patient-profile-avatar">
          {patient.name?.charAt(0)?.toUpperCase() || "P"}
        </div>

        <div className="patient-profile-info">
          <span className="dashboard-eyebrow">PATIENT PROFILE</span>
          <h1>{patient.name}</h1>
          <p>Patient ID: {patient.patientId}</p>
        </div>

        <div className="patient-profile-actions">
  <button className="edit-patient-btn" onClick={onEdit}>
    ✎ Edit Patient
  </button>

  <div className="patient-profile-badge">
    <span className="profile-status-dot"></span>
    Patient Record
  </div>
</div>
      </div>

      {/* Personal Information */}
      <div className="details-section">
        <div className="details-section-heading">
          <div className="details-heading-icon">♙</div>
          <div>
            <h2>Personal Information</h2>
            <p>Patient's basic contact and demographic information</p>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Patient ID</span>
            <p>{patient.patientId || "N/A"}</p>
          </div>

          <div className="detail-item">
            <span className="detail-label">Age</span>
            <p>{patient.age ?? "N/A"}{patient.age != null ? " years" : ""}</p>
          </div>

          <div className="detail-item">
            <span className="detail-label">Gender</span>
            <p>{patient.gender || "N/A"}</p>
          </div>

          <div className="detail-item">
            <span className="detail-label">Phone Number</span>
            <p>{patient.contact?.phone || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div className="details-section">
        <div className="details-section-heading">
          <div className="details-heading-icon">⚠</div>
          <div>
            <h2>Allergies</h2>
            <p>Recorded allergy information</p>
          </div>
        </div>

        {patient.allergies?.length ? (
          <div className="allergy-list">
            {patient.allergies.map((allergy, index) => (
              <div className="allergy-tag" key={index}>
                <span>⚠</span> {allergy}
              </div>
            ))}
          </div>
        ) : (
          <div className="details-empty">No allergies recorded.</div>
        )}
      </div>

      {/* Medical History */}
      <div className="details-section">
        <div className="details-section-heading">
          <div className="details-heading-icon">✚</div>
          <div>
            <h2>Medical History</h2>
            <p>Conditions and medical history records</p>
          </div>
        </div>

        {patient.medicalHistory?.length ? (
          <div className="medical-history-list">
            {patient.medicalHistory.map((item, index) => (
              <div className="medical-history-item" key={index}>
                <div className="history-indicator"></div>
                <div>
                  <h3>{item.condition || "Condition"}</h3>
                  {item.notes && <p>{item.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="details-empty">No medical history recorded.</div>
        )}
      </div>

      {/* Prescriptions */}
      <div className="details-section">
        <div className="details-section-heading">
          <div className="details-heading-icon">℞</div>
          <div>
            <h2>Prescriptions</h2>
            <p>Patient medication records</p>
          </div>
        </div>

        {patient.prescriptions?.length ? (
          <div className="prescription-list">
            {patient.prescriptions.map((item, index) => (
              <div className="prescription-item" key={index}>
                <span className="prescription-number">{index + 1}</span>
                <p>
                  {typeof item === "string"
                    ? item
                    : item.medication || item.name || JSON.stringify(item)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="details-empty">No prescriptions recorded.</div>
        )}
      </div>

      {/* Doctor Notes */}
      <div className="details-section">
        <div className="details-section-heading">
          <div className="details-heading-icon">▤</div>
          <div>
            <h2>Doctor Notes</h2>
            <p>Clinical notes and observations</p>
          </div>
        </div>

        {patient.doctorNotes?.length ? (
          <div className="doctor-notes-list">
            {patient.doctorNotes.map((note, index) => (
              <div className="doctor-note-item" key={index}>
                <p>
                  {typeof note === "string"
                    ? note
                    : note.note || note.text || JSON.stringify(note)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="details-empty">No doctor notes recorded.</div>
        )}
      </div>

      {/* Visit History */}
      <div className="details-section">
        <div className="details-section-heading">
          <div className="details-heading-icon">▣</div>
          <div>
            <h2>Visit History</h2>
            <p>Previous patient visits and diagnoses</p>
          </div>
        </div>

        {patient.visits?.length ? (
          <div className="visit-history-list">
            {patient.visits.map((visit, index) => (
              <div className="visit-history-item" key={index}>
                <div className="visit-history-top">
                  <span className="visit-number">Visit {index + 1}</span>
                  <span className="visit-date">
                    {visit.visitDate
                      ? new Date(visit.visitDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="visit-grid">
                  <div>
                    <span className="detail-label">Department</span>
                    <p>{visit.department || "N/A"}</p>
                  </div>

                  <div>
                    <span className="detail-label">Diagnosis</span>
                    <p>{visit.diagnosis || "N/A"}</p>
                  </div>

                  <div>
                    <span className="detail-label">Doctor</span>
                    <p>{visit.doctorName || "N/A"}</p>
                  </div>
                </div>

                {visit.notes && (
                  <div className="visit-notes">
                    <span className="detail-label">Notes</span>
                    <p>{visit.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="details-empty">No visits recorded.</div>
        )}
      </div>

    </div>
  );
}

export default PatientDetails;
