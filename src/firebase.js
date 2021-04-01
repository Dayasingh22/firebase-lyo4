import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

var config = {
  apiKey: "AIzaSyAopLfxxiFAwmrxBddBXLfCjxJyvuDkfWU",
  authDomain: "lyoimsweb-b0810.firebaseapp.com",
  projectId: "lyoimsweb-b0810",
  databaseURL: "https://lyoimsweb-b0810-default-rtdb.firebaseio.com/",
  storageBucket: "lyoimsweb-b0810.appspot.com",
  messagingSenderId: "1017799830672",
  appId: "1:1017799830672:web:78a81ee7d051508c563c15",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const storage = app.storage(); //storage
export const storageRef = storage.ref();
export const db = app.firestore();
export const firebaseDb = app.database().ref();
export default app;
