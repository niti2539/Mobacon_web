import { resolve } from "upath";
import { includes } from "lodash";
import { withRouter } from "react-router-dom";

export const api = {
  baseUrl: "http://mobacon-api.pieros.site",
  baseApi: "http://mobacon-api.pieros.site" + "/mobacon/api/web"
};

function ReqError(response) {
  this.response = {
    data: response
  };
  return this.response;
}

async function handleError(response) {
  if (!response.ok) {
    if (response.status == 401) {
      console.log("Status", response.status);
      window.location.replace("/login");
    }
    const result = await response.json();

    console.error("Response error", result.message);
    throw new ReqError(result);
  }
  return response;
}

async function handleResponse(response) {
  const result = await response.json();
  if (result.token) {
    await localStorage.setItem("accessToken", result.token);
    // console.log("Set new token", result.token);
  }
  return result;
}

export const imageRequest = async (path = "") => {
  const token = localStorage.getItem("accessToken");
  console.log("Path", path);
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "no-cors"
    }
  };
  return new Promise((resolve, reject) => {
    fetch(api.baseUrl + path, config)
      .then(handleError)
      .then(response => response.blob())
      .then(images => {
        // Then create a local URL for that image and print it
        let outside = URL.createObjectURL(images);
        console.log("Image", outside);
        return outside;
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
};

export const apiRequest = async (
  path = "/",
  method = "GET",
  body = null,
  headers = {}
) => {
  method = method.toUpperCase();
  const token = localStorage.getItem("accessToken");
  let config = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
      mode: "no-cors",
      ...headers
    }
  };
  if (!includes(["GET", "PATCH"], method)) {
    config.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch(api.baseApi + path, config)
      .then(handleError)
      .then(handleResponse)
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
};
