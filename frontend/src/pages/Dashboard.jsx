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
      <div className="dashboard-header">
        <div>
          <h1>Patient Dashboard</h1>
          <p>Manage and monitor patient records</p>
        </div>

        <button
  className="add-patient-btn"
  onClick={onAddPatient}
>
  + Add Patient
</button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <h2>{patients.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Today's Visits</h3>
          <h2>--</h2>
        </div>

        <div className="stat-card">
          <h3>Departments</h3>
          <h2>--</h2>
        </div>

        <div className="stat-card">
          <h3>Active Staff</h3>
          <h2>--</h2>
        </div>
      </div>

      <div className="patient-section">
        <h2>Recent Patients</h2>

        {loading && <p>Loading patients...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && patients.length === 0 && (
          <p>No patients found.</p>
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