import axiosInstance from "./axiosConfig";

// ─── Auth API Functions ────────────────────────────────────────────────────────
// All functions in this file are thin wrappers around axiosInstance calls.
// Responsibilities of this file:
//   • Send the correct HTTP method and payload to the right endpoint.
//   • Return response.data so callers work with plain objects, not Axios wrappers.
//
// Responsibilities that are NOT in this file:
//   • Attaching JWT headers      → handled by axiosInstance request interceptor
//   • Handling 401 redirects     → handled by axiosInstance response interceptor
//   • Storing tokens / user data → handled by the calling context or component
// ──────────────────────────────────────────────────────────────────────────────


// Register a new user
// Endpoint : POST /register
// Payload  : { name, email, password }
// Response : { success, message, user: { id, name, email, role } }
export const registerApi = async (userData) => {
  const response = await axiosInstance.post("/register", userData);
  return response.data;
};


// Log in an existing user
// Endpoint : POST /login
// Payload  : { email, password }
// Response : { success, message, token, user: { name, email, role } }
export const loginApi = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};
