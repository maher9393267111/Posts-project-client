
import firebase from 'firebase'

const firebaseConfig =  firebase.initializeApp({
    apiKey: "AIzaSyD_Eub_0yK8fx_ZuWvLTFu6S2bgVoYeB7M",
    authDomain: "mern-4dbe9.firebaseapp.com",
    projectId: "mern-4dbe9",
    storageBucket: "mern-4dbe9.appspot.com",
    messagingSenderId: "455005923505",
    appId: "1:455005923505:web:e91b064422d11f2222da90"
});

// Initialize Firebase
const db = firebaseConfig.firestore()

const auth = firebase.auth()

const storage = firebase.storage();
export { db, auth,storage }