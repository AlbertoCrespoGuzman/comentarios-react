import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCkkLGgiqCqVEmX1D_CUaY3fjUASv2cPCw",
    authDomain: "comments2-reactjs.firebaseapp.com",
    databaseURL: "https://comments2-reactjs.firebaseio.com",
    projectId: "comments2-reactjs",
    storageBucket: "comments2-reactjs.appspot.com",
    messagingSenderId: "77653105517"
  };
  firebase.initializeApp(config);

  export const database = firebase.database()
  export const auth = firebase.auth()