import { combineReducers } from "redux";
import user from "./user";
import request from "./request";

export default combineReducers({
  user,
  request
});
