import { resolve } from "upath";

export const api = {
  baseUrl: "http://mobacon-api.pieros.site",
  baseApi: "http://mobacon-api.pieros.site" + "/mobacon/api/web"
};

export const apiRequest = async (
  path = "/",
  method = "GET",
  body = null,
  headers = {}
) => {
  let token = localStorage.getItem("accessToken");
  let config = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers
    }
  };
  if (method.toUpperCase() !== "GET") {
    config.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch(api.baseApi + path, config)
      .then(async resp => await resp.json())
      .then(result => {
        // console.log("Resolved", result);
        resolve(result);
      })
      .catch(err => reject(err));
  });
};
