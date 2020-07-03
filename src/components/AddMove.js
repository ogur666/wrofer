import React, {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import firebase from "firebase";
import 'firebase/firestore';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl);

const AddMove = ({onClick}) => {
    const [show, setShow] = useState(false);
    const db = firebase.firestore();
    const [startDate, setStartDate] = useState(new Date());
    const [product, setProduct] = useState("");
    const [listOfProducts, setListOfProducts] = useState([]);
    const move = ["Dostawa", "Wysyłka", "R+", "R-", "Strata"];
    const [selectMove, setSelectMove] = useState("");
    const [seller, setSeller] = useState("");
    const [users, setUsers] = useState([]);
    const [notes,setNotes] = useState("");
    const [quantity, setQuantity] = useState("");
    const [counters, setCounters] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        db.collection('products')
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setListOfProducts(prevState => [...prevState, doc.data()]);
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
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
            .doc('stock').get()
            .then(result => {
                setCounters(result.data())});

    },[db]);

    const handleCheckList = ()=> {
        if (typeof onClick === "function") {
            onClick();
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        const newCounter ={
            stockDocs: counters.stockDocs + 1,
            stockIDs: counters.stockIDs + 1
        };

        let id = "";
            listOfProducts.forEach((e) => {
            if (e.name === product) {
                id = e.id
            }
        });

        if (selectMove === "Dostawa" || selectMove === "R+") {
            db.collection('products')
                .doc(`${id}`)
                .update({stock: firebase.firestore.FieldValue.increment(Number(quantity))})
                .catch(error=>console.log(error));
        } else if (selectMove === "Wysyłka" || selectMove === "R-" || selectMove === "Strata") {
            db.collection('products')
                .doc(`${id}`)
                .update({stock: firebase.firestore.FieldValue.increment( - Number(quantity))})
                .catch(error=>console.log(error));
        }
        const newMove = {
            id: counters.stockIDs + 1,
            date: startDate.toISOString().substring(0, 10),
            name: product,
            quantity: quantity,
            typeOfMove: selectMove,
            seller: seller,
            notes: notes
        };
        db.collection('counters')
            .doc('stock')
            .update(newCounter)
            .catch(error=>console.log(error));

        db.collection('stock')
            .doc(`${counters.stockDocs + 1}`)
            .set(newMove)
            .then(() => {
                handleClose();
                handleCheckList();
            })
            .catch(error => console.log(error))
    };

    const isInvalid = selectMove !== 'Wysyłka';

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
                    <select
                        value={product}
                        onChange={e => setProduct(e.target.value)}
                    >
                        <option>Produkt</option>
                        {listOfProducts.map((e) => <option key={e.id}>{e.name}</option> )}
                    </select>
                    <input
                        placeholder="ilość"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <select
                        value={selectMove}
                        onChange={e => setSelectMove(e.target.value)}
                    >
                        <option>Ruch</option>
                        {move.map((e,i) => <option key={i}>{e}</option> )}
                    </select>
                    <select
                        value={seller}
                        onChange={e => setSeller(e.target.value)}
                        disabled={isInvalid}
                    >
                        <option>Handlowiec</option>
                        {users.map((e,i) => <option key={i}>{e.firstname} {e.lastname}</option> )}
                    </select>
                    <input
                        placeholder="uwagi"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
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
    );
};

export default AddMove;