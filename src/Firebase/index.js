import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFvyGIc_-QBYoo2ZCXGcwvWS54y5jb9eE",
  authDomain: "uploadimage-8cbac.firebaseapp.com",
  projectId: "uploadimage-8cbac",
  databaseUrl: "gs://uploadimage-8cbac.appspot.com",
  storageBucket: "uploadimage-8cbac.appspot.com",
  messagingSenderId: "273767021884",
  appId: "1:273767021884:web:26c345314f1c5fd0def239",
  measurementId: "G-LTLBYWD0KT",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
