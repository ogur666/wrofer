import React, {useEffect, useState} from 'react';
import {Button, Modal, Container, Row, Col} from "react-bootstrap";
import firebase from "firebase";
import 'firebase/firestore';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl);


const AddNewSale = ({onClick}) => {
    const [show, setShow] = useState(false);
    const db = firebase.firestore();
    const [startDate, setStartDate] = useState(new Date());
    const [counters, setCounters] = useState("");
    const [users, setUsers] = useState([]);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [seller, setSeller] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const typeOfSell = ["Sprzedaż", "Próbka"];
    const [selectTypeOfSell, setSelectTypeOfSell] = useState("");
    const typeOfPayment = ["Przelew", "Gotówka", "Pobranie"];
    const [selectTypeOfPayment, setSelectTypeOfPayment] = useState("");
    const typeOfDoc = ["Faktura", "Paragon", "WZ"];
    const [selectTypeOfDoc, setSelectTypeOfDoc] = useState("");
    const [docNr, setDocNr] = useState("");
    const [term, setTerm] = useState("");
    const [client, setClient] = useState("");
    const [listOfClients, setListOfClients] = useState([]);
    const [comments, setComments] = useState("");
    const [addList, setAddList] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        db.collection('clients')
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setListOfClients(prevState => [...prevState, doc.data()]);
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
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
            .doc('sales').get()
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

        addList.forEach(e => {
            let productPrice = "";
            let id = "";
            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            const day = startDate.getDate() + Number(term);
            const newCounter ={
                salesDocs: counters.salesDocs + 1,
                salesIDs: counters.salesIDs + 1
            };
            listOfProducts.forEach(name => {

                if(name.name === e.productName) {
                    productPrice = name.price;
                    id = name.id
                }
            });

            const newDocument = {
                id: counters.salesIDs + 1,
                date: startDate.toISOString().substring(0, 10),
                product: e.productName,
                quantity: e.productQuantity,
                sellType: selectTypeOfSell,
                payment: selectTypeOfPayment,
                dateOfPayment: (new Date(year, month, day)).toISOString().substring(0, 10),
                docType: selectTypeOfDoc,
                docNr: docNr,
                client: client,
                comments: comments,
                commentsToSellers: "",
                net1pc: selectTypeOfSell === "Próbka"? 0 : productPrice,
                vat1pc: (selectTypeOfSell === "Próbka"? 0 : productPrice) * 0.23,
                netAll: (selectTypeOfSell === "Próbka"? 0 : productPrice) * quantity,
                grossAll: ((selectTypeOfSell === "Próbka"? 0 : productPrice)+ (selectTypeOfSell === "Próbka"? 0 : productPrice) * 0.23 ) * quantity,
                billedCustomer: "",
                notes: "",
            };
            console.log(listOfProducts);
            console.log(id);
            console.log(newCounter);
            console.log(newDocument);
            // db.collection('products')
            //     .doc(`${id}`)
            //     .update({stock: firebase.firestore.FieldValue.increment( - Number(e.productQuantity))})
            //     .catch(error=>console.log(error));
            // db.collection('counters')
            //     .doc('sales')
            //     .update(newCounter)
            //     .catch(error=>console.log(error));
            // db.collection('sales')
            //     .doc(`${counters.stockDocs + 1}`)
            //     .set(newDocument)
            //     .then(() => {
            //         handleClose();
            //         handleCheckList();
            //     })
            //     .catch(error => console.log(error))
        });

    };

    const addNewProduct = () => {
        const newListOfProducts = [...setListOfProducts];
        const newItem = {
            productName: product,
            productQuantity: quantity
        }
        setAddList( prevState => [
            ...prevState, newItem]
        );
        setQuantity("");
        setListOfProducts(listOfProducts.filter((name) => name.name !== newItem.productName))
        // console.log(addList)
    };

    const isInvalid =
        product === '' ||
        quantity === '';

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Dodaj sprzedaż
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nową sprzedaż</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    locale="pl"
                                    dateFormat="yyyy.MM.dd"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <select
                                    value={client}
                                    onChange={e => setClient(e.target.value)}
                                    // disabled={isInvalid}
                                >
                                    <option>Klient</option>
                                    {listOfClients.map((e) => <option key={e.id}>{e.shortName}</option> )}
                                </select>
                            </Col>
                        </Row>
                        <div className="border-line"> </div>
                        <Row>
                            <Col>
                                <select
                                    value={selectTypeOfSell}
                                    onChange={e => setSelectTypeOfSell(e.target.value)}
                                >
                                    <option>Typ sprzedaży</option>
                                    {typeOfSell.map((e,i) => <option key={i}>{e}</option> )}
                                </select>
                                <select
                                    value={selectTypeOfPayment}
                                    onChange={e => setSelectTypeOfPayment(e.target.value)}
                                >
                                    <option>Płatność</option>
                                    {typeOfPayment.map((e,i) => <option key={i}>{e}</option> )}
                                </select>
                                <select
                                    value={selectTypeOfDoc}
                                    onChange={e => setSelectTypeOfDoc(e.target.value)}
                                >
                                    <option>Typ dokumentu</option>
                                    {typeOfDoc.map((e,i) => <option key={i}>{e}</option> )}
                                </select>
                                <input
                                    placeholder="Nr dokumentu"
                                    value={docNr}
                                    onChange={e => setDocNr(e.target.value)}
                                    // style={{width: "120px"}}
                                />
                                <input
                                    placeholder="Termin zapłaty (liczba dni)"
                                    value={term}
                                    onChange={e => setTerm(e.target.value)}
                                    // style={{width: "120px"}}
                                />

                            </Col>
                        </Row>
                        <Row>
                            <Col xl={3}>
                                <select
                                    value={seller}
                                    onChange={e => setSeller(e.target.value)}
                                    // disabled={isInvalid}
                                >
                                    <option>Handlowiec</option>
                                    {users.map((e,i) => <option key={i}>{e.firstname} {e.lastname}</option> )}
                                </select>
                            </Col>
                            <Col>
                                <input
                                    placeholder="uwagi"
                                    value={comments}
                                    onChange={e => setComments(e.target.value)}
                                    style={{width: "506px"}}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
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
                                    onChange={e => setQuantity(e.target.value.replace(/\D/g, ''))}
                                    // style={{width: "50px"}}
                                />
                                <button disabled={isInvalid} onClick={addNewProduct}>Dodaj nowy produkt</button>
                                <div className="border-line"> </div>
                                <ul>
                                    {addList.map((e,i) =><li key={i}>
                                        <span>{e.productName} </span>
                                        <span> {e.productQuantity} szt</span>
                                    </li> )}
                                </ul>
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

export default AddNewSale;