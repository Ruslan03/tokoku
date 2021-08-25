import actionType from "./users.actionType";
import initialState from "./users.initialState";

const movieReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case actionType.USER_LOGIN_START:
            return {
                ...state,
                isLogin: false,
                isLoading: true,
                errorMessage: null,
            }
        case actionType.USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isLogin: true,
                isLoading: false,
                isWaitingAuth: false
            }
        case actionType.USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
                errorMessage: payload,
                isWaitingAuth: false
            }
        case actionType.USER_LOGOUT:
            return {
                ...state,
                isLogin: false,
                user: null
            }
        default:
            return state;

    }
}

export default movieReducer;