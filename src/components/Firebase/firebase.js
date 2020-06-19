import firebase from 'firebase/app';
import 'firebase/auth';
// import {auth} from "firebase";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

        firebase.initializeApp(config);
// const Firebase = (email, password) => {
    // constructor() {
// const  auth = app.auth();
//         // this.auth = app.auth();
//     // }
//
//     // *** Auth API ***
//
// const    doCreateUser = (email, password) =>
//         auth.createUserWithEmailAndPassword(email, password);
//
// const    doSignIn = (email, password) =>
//         auth.signInWithEmailAndPassword(email, password);
//
//    const doSignOut = () => auth.signOut();
//
//   const  doPasswordReset = email => auth.sendPasswordResetEmail(email);
//
//   const  doPasswordUpdate = password =>
//         auth.currentUser.updatePassword(password);
// };

// export default Firebase;