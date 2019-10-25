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

const getAccepted = dispatch => (page, limit, filter) => {
  //promise fetch because this's might be big data
  //promise fetch data will make web fastest and don't block another process
  return apiRequest(`/requests/accepted?page=${page}&limit=${limit}`).then(
    result => {
      // console.log("result", result);
      dispatch({
        type: actionType.REQUEST_FETCH,
        data: result
      });
      return { data: result, pageSize: limit };
    }
  );
};

const getRequestById = async id => {
  return await apiRequest(`/request/${id}`, "GET");
};

const acceptanceById = async id => {
  console.log(`Acceptance ${id}`);
  return await apiRequest(`/request/${id}/acceptance`, "PATCH").catch(err =>
    alert(err.response.data.message)
  );
};

const declineById = async id => {
  return await apiRequest(`/request/${id}/decline`, "PATCH").catch(err =>
    alert(err.response.data.message)
  );
};

const createOffer = async (id = null, review = "", suggestion = "") => {
  if (!id) return alert("Error can't update offer");
  return await apiRequest(`/request/${id}/review`, "POST", {
    review,
    suggestion
  });
};

const updateMemo = async (id, memo) => {
  if (!memo) {
    return alert("Memo cannot empty");
  }
  if (memo.message.length < 1) return alert("Memo cannot empty");
  return await apiRequest(`/request/${id}/memo`, "PUT", {
    message: memo.message
  });
};
export {
  getRequest,
  getRequestById,
  acceptanceById,
  createOffer,
  declineById,
  getAccepted,
  updateMemo
};
