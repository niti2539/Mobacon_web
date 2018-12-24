import { actionType } from "../actions/index";
const initialState = {
  user_detail: {
    id: null,
    fullName: "",
    phoneNumber: null,
    email: "",
    imagePath: "",
    verified: false,
    activated: false,
    like: 0,
    dislike: 0,
    role: {
      id: null,
      name: ""
    }
  },
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
