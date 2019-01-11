import { actionType } from "../actions";
const initialState = {
  count: 0
};
const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_NOTIFY:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

export default notifyReducer;
