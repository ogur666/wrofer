import React, {useState} from 'react';
import {Link} from "react-router-dom";
// import Firebase, {FirebaseContext, withFirebase} from "./Firebase"
import firebase from 'firebase/app';
import 'firebase/auth';
// // import {auth} from "firebase";
//
// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };
// firebase.initializeApp(config);

// const Firebase = (email, password) => {
// constructor() {


const PasswordForget = () => {
    const [mail, setMail] = useState("");
    const [error, setError] = useState("");
    let [isVisible, setVisible] = useState("");

    // const firebase = Firebase.firebase;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setVisible("");
        if (mail.length === 0 || !mail.includes("@")) {
            setError("Niepoprawny adres e-mail.");
            hideError()
        } else {
            firebase.auth().sendPasswordResetEmail(mail)
                .then(()=>{
                    setError("Wysłano linka na Twój adres e-mail.");
                    setMail("")
                })
                .catch(() => {
                    setError("Nieprawidłowy adres e-mail")
                })

        }
        hideError();
    };

    const hideError = () => {
        setTimeout(() => {
            setVisible("none");
        },3000);
    };

    return (
            <section className="login-board" >
                <p>Wpisz swój adres e-mail, aby zresetować hasło</p>
        {/*<FirebaseContext.Consumer>*/}
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email"
                           placeholder="wpisz swój e-mail"
                           autoComplete="off" required value={mail}
                           onChange={(event => setMail(event.target.value))}
                    /><br />
                    <button>Gotowe!</button>
                    <p className="error-message"><span style={{display:isVisible}}>{error}</span></p>
                </form>
        {/*</FirebaseContext.Consumer>*/}
                < Link className="pwd-forget"  to="/">Powrót</Link>
            </section>
    )
};

// const Pass = withFirebase(PasswordForget);
export default PasswordForget;
// export {Pass};