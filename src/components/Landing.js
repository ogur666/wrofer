import React, {useState} from 'react';
import {Link} from "react-router-dom";
import firebase from "firebase";
import 'firebase/auth'
// import Example from "../Example";

const Landing = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let [isVisible, setVisible] = useState("");

const handleSubmit = (e) => {
    setError("");
    setVisible("");
    e.preventDefault();
    if (login.length <= 0 || password.length <= 0) {
        setError("Nieprawidłowy login lub hasło.")
    } else {

        firebase.auth()
            .signInWithEmailAndPassword(login, password)
            .then(()=>{
                    setLogin("");
                    setPassword("");
                    console.log("Zalogowano")
            })
            .catch(()=>setError("Nieprawidłowy login lub hasło"))
    }
    setTimeout(() => {
        setVisible("none");
    },3000);
};
    return (
        <section className="login-board" >
            <h1>Witaj,</h1>
            <p>wpisz swój login i hasło aby się zalogować</p>
            <form className="form" onSubmit={handleSubmit}>
                <input type="email"
                       placeholder="wpisz swój login"
                       autoComplete="off" required value={login}
                       onChange={(event => setLogin(event.target.value))}
                /><br />
                <input type="password" placeholder="wpisz hasło"
                       value={password}
                       onChange={event => setPassword(event.target.value)}
                /> <br />
                <button>Gotowe!</button>
                <p className="error-message"><span style={{display:isVisible}}>{error}</span></p>
            </form>
            < Link className="pwd-forget"  to="/pwd_forget">Zapomniałem hasła :-(</Link>
            {/*<Example/>*/}
        </section>
    )
};

export default Landing;
