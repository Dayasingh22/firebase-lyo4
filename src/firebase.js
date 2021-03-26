import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



var config = {
  apiKey: "AIzaSyDmWlaEkgA2o7A4qkVeEXaC2N_OWFEaMd0",
  authDomain: "lyoimsweb.firebaseapp.com",
  projectId: "lyoimsweb",
  storageBucket: "lyoimsweb.appspot.com",
  messagingSenderId: "407922520085",
  appId: "1:407922520085:web:8a80058bc9d0d32c209e1c"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const storage = app.storage();//storage
export const storageRef = storage.ref()
export const db = app.firestore();
export default app