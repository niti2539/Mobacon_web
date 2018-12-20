import { apiRequest } from "../../Configs";
import { actionType } from ".";

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

const authorize = async (dispatch) => {
  try {
    const id = localStorage.getItem("id");
    var response = await apiRequest(`/operator/${id}`, "GET");
    dispatch({ type: actionType.USER_DETIAL, data: response.operator });
  } catch (err) {
    console.log("Error", err);
    return alert("Cannot authorized!!");
  }
};

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

export { signUp, signIn, authorize, getOperators };
