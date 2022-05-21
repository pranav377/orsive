importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAb1MpzB9JHyPwYiSlvXbKGbP77TVI_SLs",
  authDomain: "orsive.firebaseapp.com",
  projectId: "orsive",
  storageBucket: "orsive.appspot.com",
  messagingSenderId: "261738070343",
  appId: "1:261738070343:web:4cca1e84eefa1c1d36cc62",
});

const initMessaging = firebase.messaging();
