
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddPatient from "./pages/AddPatient";
import PatientDetails from "./pages/PatientDetails";
import EditPatient from "./pages/EditPatient";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("dashboard");
    setSelectedPatient(null);
  };

  const handlePatientAdded = () => {
    setPage("dashboard");
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setPage("details");
  };

  const handleEditPatient = () => {
    setPage("editPatient");
  };

  const handlePatientUpdated = () => {
    setSelectedPatient(null);
    setPage("dashboard");
  };

  return !token ? (
    <Login onLogin={handleLogin} />
  ) : (
    <div className="app-layout">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          {page === "dashboard" && (
            <Dashboard
              onAddPatient={() => setPage("addPatient")}
              onViewDetails={handleViewDetails}
            />
          )}

          {page === "addPatient" && (
            <AddPatient
              onPatientAdded={handlePatientAdded}
              onCancel={() => setPage("dashboard")}
            />
          )}

          {page === "details" && (
            <PatientDetails
              patient={selectedPatient}
              onBack={() => setPage("dashboard")}
              onEdit={handleEditPatient}
            />
          )}

          {page === "editPatient" && (
            <EditPatient
              patient={selectedPatient}
              onCancel={() => setPage("details")}
              onPatientUpdated={handlePatientUpdated}
            />
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;

