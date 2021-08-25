import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBtEV-aAKX5mZewMEX2JLSqtQeLahTD8M",
    authDomain: "tokoku-9ed99.firebaseapp.com",
    databaseURL: "https://tokoku-9ed99-default-rtdb.firebaseio.com",
    projectId: "tokoku-9ed99",
    storageBucket: "tokoku-9ed99.appspot.com",
    messagingSenderId: "1092550048896",
    appId: "1:1092550048896:web:cba957afc80e790e28ba65"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;