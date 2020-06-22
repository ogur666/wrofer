import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import firebase from "firebase";
import "firebase/auth";


const Example = () => {
    const [show, setShow] = useState(false);
    const [mail, setMail] = useState("");
    const [error, setError] = useState("");
    let [isVisible, setVisible] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    // setError("Wysłano linka na Twój adres e-mail.");
                    // setMail("")
                    handleClose();
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
        <>
            <Button variant="primary" onClick={handleShow}>
                Zapomniałem hasła
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Wpisz swój adres e-mail, aby zresetować hasło</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <input type="email"
                               placeholder="wpisz swój e-mail"
                               autoComplete="off" required value={mail}
                               onChange={(event => setMail(event.target.value))}
                        />
                        <p className="error-message"><span style={{display:isVisible}}>{error}</span></p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cofnij
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Wyślij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;