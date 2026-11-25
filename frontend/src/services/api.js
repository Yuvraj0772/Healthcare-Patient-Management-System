const API_URL = "http://localhost:5000/api";

export const fetchPatients = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/patients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
};

export const addPatient = async (patientData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add patient");
  }

  return data;
};

export default API_URL;