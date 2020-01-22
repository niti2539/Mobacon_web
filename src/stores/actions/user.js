import { Redirect } from "react-router-dom";
import { apiRequest, api } from "../../Configs";
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

const authorize = async (dispatch, cb = null) => {
  const id = localStorage.getItem("id");
  if (!id) {
    if (cb) {
      cb(false);
    }
    return;
  }
  try {
    var response = await apiRequest(`/operator/${id}`, "GET");
    dispatch({ type: actionType.USER_DETIAL, data: response.operator });
    if (cb) {
      console.log(response.operator)
      cb(true, response.operator);
    }
  } catch (err) {
    if (err.response) {
      // if token has invalid delete all storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("id");
      if (cb) {
        cb(false);
      }
      // alert(err.response.data.message);
    }
    console.log("Error", err);
    // return alert("Cannot authorized!!");
  }
};

const signIn = dispatch => async data => {
  var response;
  try {
    response = await apiRequest("/login", "POST", data);
    if (response.info) {
      localStorage.setItem("id", response.info.id);
    }
    dispatch({ type: actionType.USER_DETIAL, data: response.info })
    return {
      isSuccess: true,
      data: response.info
    }
  } catch (err) {
    return {
      isSuccess: false,
      data: response.info
    }
  }
};

const register = async (data, cb = null) => {
  var response;
  try {
    response = await apiRequest("/operator", "POST", data);
    if (response && cb) {
      cb();
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message);
    }
    console.log("err", err);
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
  const token = localStorage.getItem("accessToken");
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest("/operator", "PATCH", formData);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
};
export {
  signUp,
  signIn,
  authorize,
  getOperators,
  changePassword,
  updateProfile,
  register
};
