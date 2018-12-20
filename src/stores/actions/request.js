import { actionType } from "./index";
import { apiRequest } from "../../Configs";

const getRequest = dispatch => (page, limit, filter) => {
  //promise fetch because this's might be big data
  //promise fetch data will make web fastest and don't block another process
  return apiRequest(`/requests?page=${page}&limit=${limit}`).then(result => {
    // console.log("result", result);
    dispatch({
      type: actionType.REQUEST_FETCH,
      data: result
    });
    return { data: result, pageSize: limit };
  });
};

export { getRequest };
