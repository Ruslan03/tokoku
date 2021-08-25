import actionType from "./users.actionType";

const userLoginStart = () => ({
    type: actionType.USER_LOGIN_START,
});

const userLoginSuccess = (user) => ({
    type: actionType.USER_LOGIN_SUCCESS,
    payload: user
});

const userLoginError = (errorMessage) => ({
    type: actionType.USER_LOGIN_ERROR,
    payload: errorMessage
});

const userLogout = () => ({
    type: actionType.USER_LOGOUT,
});

const actions = {
    userLoginStart,
    userLoginSuccess,
    userLoginError,
    userLogout
}

export default actions;