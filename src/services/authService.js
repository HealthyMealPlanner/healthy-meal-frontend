const API_URL = import.meta.env.VITE_API_URL;

// =========================
// Register
// =========================
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// =========================
// Login
// =========================
export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// =========================
// Forgot Password
// =========================
export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/api/Auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset code");
  }

  return data;
};

// =========================
// Verify OTP
// =========================
export const verifyOTP = async (email, otp) => {
  const response = await fetch(`${API_URL}/api/Auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      otp: otp.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid verification code");
  }

  return data;
};

// =========================
// Reset Password
// =========================
export const resetPassword = async (
  email,
  otp,
  newPassword,
  confirmNewPassword
) => {
  const response = await fetch(`${API_URL}/api/Auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      otp: otp.trim(),
      newPassword,
      confirmNewPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
};
// =========================
// Google Login
// =========================
export const googleLogin = async (idToken) => {
  const response = await fetch(`${API_URL}/api/Auth/google-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Google login failed");
  }

  return data;
};
