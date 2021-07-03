import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCwRLYXpwwgcDidNvju_TSo5lPBm7OL65M",
    authDomain: "pingapp-1.firebaseapp.com",
    projectId: "pingapp-1",
    storageBucket: "pingapp-1.appspot.com",
    messagingSenderId: "307902833105",
    appId: "1:307902833105:web:2de3aac0a33c573e6900f0",
    measurementId: "G-QMFVB9NKEK"
  };
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app)
const storageRef = firebase.storage().ref();

export const UsersRef = db.collection("users")
export const picStorage = storageRef
export { firebase };