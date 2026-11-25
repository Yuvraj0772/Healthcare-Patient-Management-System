function PatientCard({ patient, onViewDetails }) {
  return (
    <div className="patient-card">
      <div className="patient-card-header">
        <h3>{patient.name}</h3>
        <span>{patient.patientId}</span>
      </div>

      <div className="patient-card-details">
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
      </div>

      <button
        className="view-patient-btn"
        onClick={() => onViewDetails(patient)}
      >
        View Details
      </button>
    </div>
  );
}

export default PatientCard;