import { getApp, initializeApp, getApps, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAb1MpzB9JHyPwYiSlvXbKGbP77TVI_SLs",
  authDomain: "orsive.firebaseapp.com",
  projectId: "orsive",
  storageBucket: "orsive.appspot.com",
  messagingSenderId: "261738070343",
  appId: "1:261738070343:web:4cca1e84eefa1c1d36cc62",
};

export const PUBLIC_VAPID_KEY =
  "BL-mMGq4pHoR8he1UwAvnvN2SKSbAUSTKMO744n_LcfoO-k8a_O63xqoOpExx4RGJvUglvBcWgzpGCX9Ur3VCnc";
let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

export default firebaseApp;
