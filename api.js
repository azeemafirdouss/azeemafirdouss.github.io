// // api.js
// const API_BASE =  "https://azeemafirdouss-server1.onrender.com";

// function getToken() {
//   return localStorage.getItem("token");
// }

// function setToken(token) {
//   localStorage.setItem("token", token);
// }

// function apiRequest(path, method = "GET", body = null) {
//   const headers = { "Content-Type": "application/json" };
//   const token = getToken();
//   if (token) headers["Authorization"] = `Bearer ${token}`;
//   return fetch(API_BASE + path, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined
//   }).then(res => res.json());
// }
// ✅ api.js
const API_BASE = "https://azeemafirdouss-server1.onrender.com"; // your deployed backend

function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

// Generic API request helper
async function apiRequest(path, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { error: errorData.message || res.statusText };
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Network/Fetch error:", err);
    return { error: "Could not reach the backend server." };
  }
}
