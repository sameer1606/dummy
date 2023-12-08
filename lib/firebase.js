import firebase from "firebase/app";
import "firebase/auth";

const firebaseCredentials = {
  apiKey: "AIzaSyDAKbBMz0_zZBwBWYt8Iu9678QeLExRBTA",
  authDomain: "realtor-7b1b6.firebaseapp.com",
  projectId: "realtor-7b1b6",
  storageBucket: "realtor-7b1b6.appspot.com",
  messagingSenderId: "257505996149",
  appId: "1:257505996149:web:b3ccb11bd891210947f73c",
};

//If an firebase app hasn't already been created
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCredentials);
}

export default firebase;
