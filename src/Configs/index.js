export const api = {
  baseUrl: "http://mobacon-api.pieros.site/mobacon/api/web"
};

export const apiRequest = async (
  path = "/",
  method = "GET",
  body = {},
  headers = {}
) => {
  let token = localStorage.getItem("accessToken");
  return await fetch(api.baseUrl + path, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  }).then(async resp => await resp.json());
};
