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
