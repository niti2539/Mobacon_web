import _path from "path";

export const api = {
  baseUrl: "http://mobacon-api.pieros.site",
  apiPath: "/mobacon/api/web"
};

function ReqError(response) {
  this.response = {
    data: response
  };
  return this;
}

async function handleError(response) {
  if (!response.ok) {
    if (response.status == 401) {
      console.log("error response", response);
      window.location.replace("/login");
    }
    try {
      var result = await response.json();
      handleToken(result);
    } catch (err) {
      return response;
    }
    throw new ReqError(result);
    // console.error("Response error", result.message);
  }
  return response;
}

function handleToken(result) {
  if (result.token) {
    localStorage.setItem("accessToken", result.token);
    console.log("Set new token", result.token);
  }
}

async function handleResponse(response) {
  console.log("response", response);
  const result = await response.json();
  console.log("json response", result);
  handleToken(result);
  return result;
}

export const imageRequest = async (path = "") => {
  const token = localStorage.getItem("accessToken");
  if (path.trim() === "") return null;
  let config = {
    method: "GET"
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //   mode: "no-cors"
    // }
  };
  return new Promise((resolve, reject) => {
    fetch(api.baseUrl + path, config)
      // .then(function(res) {
      //   return handleError(res, false);
      // })
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

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
      delete config.headers["Content-Type"];
    } else {
      config.body = JSON.stringify(body);
    }
  }
  return new Promise((resolve, reject) => {
    fetch(api.baseUrl + _path.join(api.apiPath, path), config)
      .then(handleError)
      .then(handleResponse)
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
};
