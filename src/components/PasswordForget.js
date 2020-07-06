import React, {useState} from 'react';
import {Link} from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';

const PasswordForget = () => {
    const [mail, setMail] = useState("");
    const [error, setError] = useState("");
    let [isVisible, setVisible] = useState("");

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
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email"
                           placeholder="wpisz swój e-mail"
                           autoComplete="off" required value={mail}
                           onChange={(event => setMail(event.target.value))}
                    /><br />
                    <button>Gotowe!</button>
                    <p className="error-message"><span style={{display:isVisible}}>{error}</span></p>
                </form>
                < Link className="pwd-forget"  to="/">Powrót</Link>
            </section>
    )
};

export default PasswordForget;
