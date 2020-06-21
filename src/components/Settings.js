import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Settings = () => {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    let [isVisible, setVisible] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
    };



    return (
        <section className="login-board" >
            <p>Zmień swoje hasło</p>
            {/*<FirebaseContext.Consumer>*/}
            <form className="form" onSubmit={handleSubmit}>
                <input type="password" placeholder="wpisz nowe hasło"
                       value={password}
                       onChange={event => setPassword(event.target.value)}
                /> <br />
                <input type="password" placeholder="wpisz ponownie nowe hasło"
                       value={password2}
                       onChange={event => setPassword2(event.target.value)}
                /> <br />
                <button>Gotowe!</button>
                <p className="error-message"><span style={{display:isVisible}}>{error}</span></p>
            </form>
            {/*</FirebaseContext.Consumer>*/}
            < Link className="pwd-forget"  to="/">Powrót</Link>
        </section>
    )
};

export default Settings;