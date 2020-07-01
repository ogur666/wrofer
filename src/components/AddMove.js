import React, {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import firebase from "firebase";
import 'firebase/firestore';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl);

const AddMove = () => {
    const [show, setShow] = useState(false);
    const db = firebase.firestore();
    const [startDate, setStartDate] = useState(new Date());
    const [product, setProduct] = useState("");
    const [listOfProducts, setListOfProducts] = useState([]);
    const move = ["Sprzedaż", "Dostawa", "Wysyłka", "R+", "R-", "Gratis", "Strata", "Próbka"];
    const [selectMove, setSelectMove] = useState("");
    const [seller, setSeller] = useState("");
    const [users, setUsers] = useState([]);
    const [notes,setNotes] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        db.collection('products').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setListOfProducts(prevState => [...prevState, doc.data()]);
                    // console.log(doc.data())
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
        db.collection('users').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setUsers(prevState => [...prevState, doc.data()]);
                    // console.log(doc.data())
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });

    },[db]);

    const handleClick = (e) => {
        e.preventDefault();
        const newMove = {
            date: startDate.toISOString().substring(0, 10),
            name: product,
            quantity: quantity,
            typeOfMove: selectMove,
            seller: seller,
            notes: notes
        }
        db.collection('stock')
            .add(newMove)
            .then(() => handleClose())
            .catch(error => console.log(error))
    };


    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Dodaj ruch
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj ruch na magazynie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            locale="pl"
                            dateFormat="yyyy.MM.dd"
                        />
                    </span>
                    <select value={product} onChange={e => setProduct(e.target.value)}>
                        <option>Produkt</option>
                        {listOfProducts.map((e) => <option key={e.id}>{e.name}</option> )}
                    </select>
                    <input placeholder="ilość" value={quantity} onChange={e => setQuantity(e.target.value)}/>
                    <select value={selectMove} onChange={e => setSelectMove(e.target.value)}>
                        <option>Ruch</option>
                        {move.map((e,i) => <option key={i}>{e}</option> )}
                    </select>
                    <select value={seller} onChange={e => setSeller(e.target.value)}>
                        <option>Handlowiec</option>
                        {users.map((e,i) => <option key={i}>{e.firstname} {e.lastname}</option> )}
                    </select>
                    <input placeholder="uwagi" value={notes} onChange={e => setNotes(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="outline-primary" onClick={handleClick}>
                        Zapisz i zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddMove;