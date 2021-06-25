import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAUftYP_SbM8KllaiDyyEftRMs06r4n80A",
    authDomain: "schedulic-63c65.firebaseapp.com",
    databaseURL: "https://schedulic-63c65-default-rtdb.firebaseio.com",
    projectId: "schedulic-63c65",
    storageBucket: "schedulic-63c65.appspot.com",
    messagingSenderId: "914032289146",
    appId: "1:914032289146:web:d3a37c675a9b93dd1122c3",
    measurementId: "G-7XK7RF9MKG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore()

export default firebaseApp;