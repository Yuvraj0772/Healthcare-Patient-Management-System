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

export default API_URL;