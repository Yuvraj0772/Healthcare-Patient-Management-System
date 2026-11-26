
import { useEffect, useState } from "react";
import { fetchPatients } from "../services/api";
import PatientCard from "../components/PatientCard";

function Dashboard({ onAddPatient, onViewDetails }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data.patients || data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  return (
    <div className="dashboard">

      {/* Dashboard Welcome Section */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <span className="dashboard-eyebrow">OVERVIEW</span>
          <h1>Patient Dashboard</h1>
          <p>Monitor patient records and manage healthcare information.</p>
        </div>

        <button className="add-patient-btn" onClick={onAddPatient}>
          <span>+</span> Add New Patient
        </button>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">♙</span>
            <span className="stat-label">PATIENT RECORDS</span>
          </div>
          <h2>{patients.length}</h2>
          <p className="stat-description">Total registered patients</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">▣</span>
            <span className="stat-label">VISITS</span>
          </div>
          <h2>--</h2>
          <p className="stat-description">Visits scheduled today</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">✚</span>
            <span className="stat-label">DEPARTMENTS</span>
          </div>
          <h2>--</h2>
          <p className="stat-description">Medical departments</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon">♧</span>
            <span className="stat-label">STAFF</span>
          </div>
          <h2>--</h2>
          <p className="stat-description">Active healthcare staff</p>
        </div>

      </div>

      {/* Recent Patients */}
      <div className="patient-section">

        <div className="patient-section-header">
          <div>
            <span className="dashboard-eyebrow">PATIENT DIRECTORY</span>
            <h2>Recent Patients</h2>
            <p>Quick access to recently registered patient records.</p>
          </div>

          <span className="patient-count">
            {patients.length} Records
          </span>
        </div>

        {loading && <p className="dashboard-message">Loading patients...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && patients.length === 0 && (
          <div className="empty-patients">
            <div className="empty-icon">♙</div>
            <h3>No patient records yet</h3>
            <p>Add your first patient to get started.</p>
            <button className="add-patient-btn" onClick={onAddPatient}>
              + Add Patient
            </button>
          </div>
        )}

        {!loading && !error && patients.length > 0 && (
          <div className="patient-grid">
            {patients.slice(0, 6).map((patient) => (
              <PatientCard
                key={patient._id}
                patient={patient}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
