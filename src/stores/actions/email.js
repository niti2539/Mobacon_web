import { apiRequest } from "../../Configs";

export const emailVerification = async (password = null, token = null) => {
  if (!password || !token) return alert("Verification failed");
  try {
    const result = await apiRequest("/verification", "PATCH", {
      newPassword: password,
      confirmToken: token
    });
    if (result.message) return alert(result.message);
  } catch (err) {
    if (err.response) {
      return alert(err.response.data.message);
    }
    console.error("Email verification error", err);
  }
};

export const operatorResetPassword = async (password = null, token = null) => {
  if (!password || !token) return alert("Verification failed");
  try {
    const result = await apiRequest("/changePassword", "PATCH", {
      newPassword: password,
      changePasswordToken: token
    });
    if (result.message) return alert(result.message);
  } catch (err) {
    if (err.response) {
      return alert(err.response.data.message);
    }
    console.error("Reset password error", err);
  }
};

export const userResetPassword = async (password = null, token = null) => {
  if (!password || !token) return alert("Verification failed");
  try {
    const result = await apiRequest("../mobile/changePassword", "PATCH", {
      newPassword: password,
      changePasswordCode: token
    });
    if (result.message) return alert(result.message);
  } catch (err) {
    if (err.response) {
      return alert(err.response.data.message);
    }
    console.error("User reset password error", err);
  }
};
