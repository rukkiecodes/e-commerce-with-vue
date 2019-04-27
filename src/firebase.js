import firebase from 'firebase';
require("firebase/firestore");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7NHHl09TBq6h_Qb4GxepjBYE4y4yk_mY",
  authDomain: "vue-shop-8a37e.firebaseapp.com",
  databaseURL: "https://vue-shop-8a37e.firebaseio.com",
  projectId: "vue-shop-8a37e",
  storageBucket: "vue-shop-8a37e.appspot.com",
  messagingSenderId: "347461501186"
};
const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export {fb, db}