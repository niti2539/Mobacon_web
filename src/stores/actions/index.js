import * as user from "./user";
import * as request from "./request";
import * as notify from "./notify";
const actionType = {
  USER_DETIAL: "USER_DETIAL",
  REQUEST_FETCH: "REQUEST_FETCH",
  REQUEST_ACCEPTANCE: "REQUEST_ACCEPTANCE",
  UPDATE_NOTIFY: "UPDATE_NOTIFY"
};

export { user, request, actionType, notify };
