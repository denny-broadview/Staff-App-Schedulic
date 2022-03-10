import * as firebase from 'firebase';


const firebaseConfig = {
    // apiKey: "AIzaSyBXIPD2yTHyA66hLrXfuHoHbqg-bCt13xo",
    apiKey: "AIzaSyA8RwRCpG7ajbR-pl0D58oUGzi83c6RCYk",
    authDomain: "schedulic-firebase.firebaseapp.com",
    databaseURL: "https://schedulic-63c65-default-rtdb.firebaseio.com",
    projectId: "schedulic-firebase",
    storageBucket: "schedulic-firebase.appspot.com",
    messagingSenderId: "876148853156",
    appId: "1:876148853156:web:e09cacb49fe5dfff79d931",
    measurementId: "G-V2BYR99JX5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore()

export default firebaseApp; 