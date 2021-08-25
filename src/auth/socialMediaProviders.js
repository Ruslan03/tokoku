import firebaseConfig from "../firebase.conig";

export const googleProvider = new firebaseConfig.auth.GoogleAuthProvider();
export const facebookProvider = new firebaseConfig.auth.FacebookAuthProvider();