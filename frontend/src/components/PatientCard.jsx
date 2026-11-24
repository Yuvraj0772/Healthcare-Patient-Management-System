function PatientCard({ patient }) {
  return (
    <div className="patient-card">
      <div className="patient-card-header">
        <h3>{patient.name}</h3>
        <span>{patient.patientId}</span>
      </div>

      <div className="patient-card-details">
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
      </div>

      <button className="view-patient-btn">
        View Details
      </button>
    </div>
  );
}

export default PatientCard;