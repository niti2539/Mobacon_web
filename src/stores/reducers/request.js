import { actionType } from "../actions";
const initialState = {
  recordsTotal: 0,
  filteredTotal: 0,
  data: []
};
const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.REQUEST_FETCH:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

export default requestReducer;
