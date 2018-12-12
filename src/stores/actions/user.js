import { apiRequest } from "../../Configs";
import { actionType } from ".";

async function signUp(data) {
  let auth = localStorage.getItem("accessToken");
  console.log(localStorage.getItem("accessToken"));
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

const signIn = dispatch => async data => {
  let response;
  try {
    response = await apiRequest("/login", "POST", data);
  } catch (e) {
    response = e.response.message;
  }
  dispatch({ type: actionType.USER_DETIAL, data: response.info });
  return response;
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

export { signUp, signIn, getOperators };
