import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC8aBGhtls2gC2FFrYHsJxgkATTLOIkdd4",
    authDomain: "ping-5790b.firebaseapp.com",
    projectId: "ping-5790b",
    storageBucket: "ping-5790b.appspot.com",
    messagingSenderId: "8159093360",
    appId: "1:8159093360:web:22f0e351e0c755593d4ab5"
  };
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };