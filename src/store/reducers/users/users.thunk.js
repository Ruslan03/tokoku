import action from "./users.action";
import firebase from "../../../firebase.conig";

export const loginEmailPassword = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(action.userLoginStart())

        firebase.auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((res) => {
            dispatch(action.userLoginSuccess(res.user))
            resolve(true)
        })
        .catch((err) => {
            dispatch(action.userLoginError(err.message))
            resolve(false)
        })
    })
}


export const loginSocialMedia = (provider) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(action.userLoginStart())

        firebase.auth()
        .signInWithPopup(provider)
        .then((res) => {
            dispatch(action.userLoginSuccess(res.user))
            resolve(true)
        })
        .catch((err) => {
            console.log(err)
            dispatch(action.userLoginError(err.message))
            reject(true)
        })
    })
}

export const logout = () => dispatch => {
    return new Promise((resolve) => {
        firebase.auth().signOut().then(() => {
            dispatch(action.userLogout())
            resolve(true)
        }).catch(() => {
            resolve(false)
        });
        
    })
}