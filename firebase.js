const firebase = require('firebase');

require('firebase/auth')
require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyAFtwdaWfO_CBxJytKeZ38Y7APBI6FA9SQ",
  authDomain: "olddonkeygarage-55417.firebaseapp.com",
  databaseURL: "https://olddonkeygarage-55417-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "olddonkeygarage-55417",
  storageBucket: "olddonkeygarage-55417.appspot.com",
  messagingSenderId: "75338838752",
  appId: "1:75338838752:web:a5213fcf7fcc6b0a489685"
}

const firebaseInit = () => {

    firebase.initializeApp(firebaseConfig);
    //const database = firebase.database();
    
}


module.exports = { firebaseInit, firebase }