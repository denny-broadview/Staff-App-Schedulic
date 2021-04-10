import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAcBzmEj5U2TvXauk8dRBelLdp3uhlBMXc",
    authDomain: "appointment-20a10.firebaseapp.com",
    databaseURL: "https://appointment-20a10-default-rtdb.firebaseio.com",
    projectId: "appointment-20a10",
    storageBucket: "appointment-20a10.appspot.com",
    messagingSenderId: "1072321180720",
    appId: "1:1072321180720:web:1f963a585275aec027a9f5",
    measurementId: "G-HG9FY2YCXC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore()

export default firebaseApp;