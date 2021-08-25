import firebase from "../firebase.conig";

export const addCart = (uid, data) => {
    return firebase.database().ref(`Cart/${uid}`).push(data)
}

export const getCartByUser = (uid) => {
    return firebase.database().ref(`Cart/${uid}`)
}

export const removeCartById = (uid, id) => {
    return firebase.database().ref(`Cart/${uid}`).child(id).remove()
}

export const updateCartById = (uid, id, data) => {
    return firebase.database().ref(`Cart/${uid}`).child(id).update(data)
}