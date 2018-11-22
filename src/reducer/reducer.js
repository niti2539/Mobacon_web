import { USER_DETAIL } from '../Action/user';
const initialState = {
    user_detail: {},
    loading: false,
}
export default function(state = initialState, action) {
    switch(action.type){
        case USER_DETAIL:
            return {
                ...state,
                user_detail: action.user_detail

            }
        default: 
            return state;
    }
}
