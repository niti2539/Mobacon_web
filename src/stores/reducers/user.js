import { actionType } from "../actions";
const initialState = {
  user_detail: {},
  loading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_DETIAL:
      return {
        ...state,
        user_detail: action.data
      };
    default:
      return state;
  }
};

export default userReducer;
