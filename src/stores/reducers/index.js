import { combineReducers } from "redux";
import user from "./user";
import request from "./request";
import notify from "./notify";

export default combineReducers({
  user,
  request,
  notify
});
