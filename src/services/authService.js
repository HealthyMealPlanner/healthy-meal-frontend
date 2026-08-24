const API_URL = import.meta.env.VITE_API_URL;

// =========================
// Helper
// =========================
const parseResponse = async (response, defaultMessage) => {
  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.title ||
        defaultMessage
    );
  }

  return data;
};

// =========================
// Register
// =========================
export const registerUser = async (userData) => {
  const response = await fetch(
    `${API_URL}/Auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return parseResponse(
    response,
    "Registration failed"
  );
};

// =========================
// Login
// =========================
export const loginUser = async (loginData) => {
  const response = await fetch(
    `${API_URL}/Auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  const data = await parseResponse(
    response,
    "Login failed"
  );

  return data;
};

// =========================
// Forgot Password
// =========================
export const forgotPassword = async (email) => {
  const response = await fetch(
    `${API_URL}/Auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
      }),
    }
  );

  return parseResponse(
    response,
    "Failed to send reset code"
  );
};

// =========================
// Verify OTP
// =========================
export const verifyOTP = async (email, otp) => {
  const response = await fetch(
    `${API_URL}/Auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        otp: otp.trim(),
      }),
    }
  );

  return parseResponse(
    response,
    "Invalid verification code"
  );
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
  const response = await fetch(
    `${API_URL}/Auth/reset-password`,
    {
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
    }
  );

  return parseResponse(
    response,
    "Failed to reset password"
  );
};

// =========================
// Google Login
// =========================
export const googleLogin = async (idToken) => {
  const response = await fetch(
    `${API_URL}/Auth/google-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    }
  );

  return parseResponse(
    response,
    "Google login failed"
  );
};

// =========================
// Logout
// =========================
export const logoutUser = () => {
  // Remove authentication token
  localStorage.removeItem("token");

  // Remove stored user/profile data if they exist
  localStorage.removeItem("user");
  localStorage.removeItem("profile");

  // Redirect to login page
  window.location.href = "/login";
};