import firebase from "firebase/compat/app";
// auth
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBRlwOJMqeWcGZb9boyRW2MtLbk_IkRBDI",
  authDomain: "clone-9b352.firebaseapp.com",
  projectId: "clone-9b352",
  storageBucket: "clone-9b352.appspot.com",
  messagingSenderId: "200132046772",
  appId: "1:200132046772:web:80b7fe31036ef78f084ce1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = app.firestore()

