import { actionType } from "./index";
import { apiRequest } from "../../Configs";

const getRequest = dispatch => (page, limit) => {
  //promise fetch because this's might be big data
  //promise fetch data will make web fastest and don't block another process
  return apiRequest(`requests?page=${page}&limit=${limit}`).then(result => {
    dispatch({
      type: actionType.REQUEST_FETCH,
      result
    });
  });
};

export { getRequest };
