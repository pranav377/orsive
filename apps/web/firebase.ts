import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAb1MpzB9JHyPwYiSlvXbKGbP77TVI_SLs",
  authDomain: "orsive.firebaseapp.com",
  projectId: "orsive",
  storageBucket: "orsive.appspot.com",
  messagingSenderId: "261738070343",
  appId: "1:261738070343:web:4cca1e84eefa1c1d36cc62",
};

let firebaseApp: firebase.app.App;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}

export default firebaseApp;
