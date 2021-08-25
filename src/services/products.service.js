import firebase from "../firebase.conig";

export const getAllProduct = () => {
    return firebase.database().ref('Products')
}

export const getProductByID = (id) => {
    return firebase.database().ref('Products').child(id)
}