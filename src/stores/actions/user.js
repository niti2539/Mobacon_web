import { Redirect } from "react-router-dom";
import { apiRequest } from "../../Configs";
import { actionType } from "./index";

async function signUp(data) {
  let response;
  try {
    response = await apiRequest("/operator", "POST", data, {
      "Content-Type": "application/x-www-form-urlencoded"
    });
    console.log(response);
  } catch (e) {
    response = { message: "fails" };
  }
  return response;
}

const authorize = async dispatch => {
  try {
    const id = localStorage.getItem("id");
    var response = await apiRequest(`/operator/${id}`, "GET");
    dispatch({ type: actionType.USER_DETIAL, data: response.operator });
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message);
    }
    console.log("Error", err);
    // return alert("Cannot authorized!!");
  }
};

const signIn = dispatch => async data => {
  let response;
  try {
    response = await apiRequest("/login", "POST", data);
    if (response.info) {
      localStorage.setItem("id", response.info.id);
    }
    dispatch({ type: actionType.USER_DETIAL, data: response.info });
    return true;
  } catch (err) {
    return false;
  }
};

const changePassword = (password, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest("/operator/password", "PATCH", {
        oldPassword: password,
        newPassword: newPassword
      });
      resolve(result.message);
    } catch (err) {
      if (err.response) {
        return reject(err.response.data.message);
      }
      console.log("Change password error", err);
    }
  });
};

async function getOperators(data) {
  let response;
  try {
    response = await apiRequest("/operators", "GET", data);
    console.log(response);
  } catch (e) {
    response = { message: "fails" };
  }
  return response;
}

const updateProfile = dispatch => formData => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest("/operator", "PATCH", formData, {
        "Content-Type": "application/x-www-form-urlencoded"
      });
      return resolve(result);
    } catch (err) {
      return reject(err.response.data);
    }
  });
};
export {
  signUp,
  signIn,
  authorize,
  getOperators,
  changePassword,
  updateProfile
};
