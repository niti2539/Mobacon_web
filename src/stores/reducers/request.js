import { actionType, request } from "../actions";
const initialState = {
    data: []
};
const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_REQUEST:
      return request.getRequest(state, action);
    default:
      return state;
  }
};

export default requestReducer;
