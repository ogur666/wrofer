import React, {useEffect, useState} from 'react';
import {Button, Modal, Container, Row, Col} from "react-bootstrap";
import firebase from "firebase";
import 'firebase/firestore';

const AddNewClient = ({onClick}) => {
    const [show, setShow] = useState(false);
    const db = firebase.firestore();
    const [nip, setNip] = useState("");
    const [fullName, setFullName] = useState("");
    const [shortName, setShortName] = useState("");
    const [street, setStreet] = useState("");
    const [houseNr, setHouseNr] = useState("");
    const [localNr, setLocalNr] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [counters, setCounters] = useState("");
    const [seller, setSeller] = useState("");
    const [users, setUsers] = useState([]);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        db.collection('users')
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setUsers(prevState => [...prevState, doc.data()]);
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
        db.collection('counters')
            .doc('clients').get()
            .then(result => {
                setCounters(result.data())})
            .catch((err) => {
            console.log('Błąd bazy danych: ', err);
        });

    }, [db]);

    const handleCheckList = ()=> {
        if (typeof onClick === "function") {
            onClick();
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        const newCounter ={
            clientsDocs: counters.clientsDocs + 1,
            clientsIDs: counters.clientsIDs + 1
        };
        const newClient = {
            id: counters.clientsIDs + 1,
            NIP: nip,
            fullName: fullName,
            shortName: shortName,
            street: street,
            houseNr: houseNr,
            localNr: localNr,
            postCode: postCode,
            city: city,
            country: country,
            email: email,
            telephoneNr: phone,
            priceGroup: "",
            seller: seller
        };

        // function isValidNip(nip) {
        //     if(typeof nip !== 'string')
        //         return false;
        //
        //     nip = nip.replace(/[\ \-]/gi, '');
        //
        //     let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        //     let sum = 0;
        //     let controlNumber = parseInt(nip.substring(9, 10));
        //     let weightCount = weight.length;
        //     for (let i = 0; i < weightCount; i++) {
        //         sum += (parseInt(nip.substr(i, 1)) * weight[i]);
        //     }
        //
        //     return sum % 11 === controlNumber;
        // }

        if (nip.length !==10 && nip.length > 0) {
            setError("Nieprawidłowy NIP!")
        } else {
            db.collection('counters')
                .doc('clients')
                .update(newCounter)
                .catch(error=>console.log(error));

            db.collection('clients')
                .doc(`${counters.clientsDocs + 1}`)
                .set(newClient)
                .then(() => {
                    handleClose();
                    handleCheckList();
                })
                .catch(error => console.log(error));
            setCounters(newCounter);
        }
        setTimeout(() => {
            setError("");
        },3000);
    };

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Dodaj klienta
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nowego klienta</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xl={8}>
                                <input
                                    className="nip"
                                    placeholder="NIP"
                                    value={nip}
                                    onChange={e => setNip(e.target.value.replace(/\D/g, ''))}
                                />
                                <span className="error-message">{error}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={8}>
                                <input
                                    className="full-name"
                                    placeholder="Nazwa pełna"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={8}>
                                <input
                                    className="short-name"
                                    placeholder="Nazwa skrócona"
                                    value={shortName}
                                    onChange={e => setShortName(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <div className="border-line"> </div>
                        <Row>
                            <Col xl={6}>
                                <input
                                    className="street"
                                    placeholder="Ulica"
                                    value={street}
                                    onChange={e => setStreet(e.target.value)}
                                />
                            </Col>
                            <Col xl={6}>
                                <input
                                    className="house-nr"
                                    placeholder="Nr domu"
                                    value={houseNr}
                                    onChange={e => setHouseNr(e.target.value)}
                                />
                                <span>/</span>
                                <input
                                    className="local-nr"
                                    placeholder="nr lokalu"
                                    value={localNr}
                                    onChange={e => setLocalNr(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6}>
                                <input
                                    className="city"
                                    placeholder="Miejscowość"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </Col>
                            <Col xl={6}>
                                <input
                                    className="post-code"
                                    placeholder="Kod pocztowy"
                                    value={postCode}
                                    onChange={e => setPostCode(e.target.value)}
                                />
                                <input
                                    className="country"
                                    placeholder="Kraj"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <div className="border-line"> </div>
                        <Row>
                            <Col xl={6}>
                                <input
                                    type="email"
                                    className="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Col>
                            <Col xl={6}>
                                <input
                                    className="phone"
                                    placeholder="Telefon"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <div className="border-line"> </div>
                        <Row>
                            <Col xl={8}>
                                <span>Przypisz klientowi handlowca: </span>
                                <select
                                    value={seller}
                                    onChange={e => setSeller(e.target.value)}
                                >
                                    <option>Handlowiec</option>
                                    {users.map((e,i) => <option key={i}>{e.firstname} {e.lastname}</option> )}
                                </select>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-secondary"
                        onClick={handleClose}
                    >
                        Anuluj
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={handleClick}
                    >
                        Zapisz i zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default AddNewClient;