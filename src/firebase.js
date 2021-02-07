import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCTINOwIkA9tHAjqr0fdV6qkSlQmWiT2zw",
    authDomain: "alfred-473ff.firebaseapp.com",
    databaseURL: "https://alfred-473ff-default-rtdb.firebaseio.com",
    projectId: "alfred-473ff",
    storageBucket: "alfred-473ff.appspot.com",
    messagingSenderId: "625149125676",
    appId: "1:625149125676:web:cd1aac771cf946b56b5d89",
    measurementId: "G-2J1F4D1XPG"
})

export { firebaseConfig as firebase };