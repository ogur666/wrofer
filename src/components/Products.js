import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Products = () => {
    const db = firebase.firestore();
    const [listOfProducts, setListOfProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [counters, setCounters] = useState("");

    useEffect(()=>{
        db.collection('products').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setListOfProducts(prevState => [...prevState, doc.data()]);
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });

        db.collection('counters').doc('products').get()
            .then(result => {
                setCounters(result.data())});
    },[db]);

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newCounter ={
            productsDocs: counters.productsDocs + 1,
            productsIDs: counters.productsIDs + 1
        };
        const newProduct = {
            id: counters.productsIDs + 1,
            name: productName,
            price: productPrice,
            stock: 0
        };
        db.collection('counters').doc('products')
            .update(newCounter)
            .catch(error=>console.log(error));

        db.collection('products')
            .doc(`${counters.productsDocs + 1}`)
            .set(newProduct)
            .catch(error=>console.log(error));
        setListOfProducts(prevState => [...prevState, newProduct]);
        setProductName("");
        setProductPrice("");
        setCounters(newCounter);
    };

    const isInvalid =
        productName === '' ||
        productPrice === '';

    return (
        <main className="main-container">
            <section className="box">
                <h2>Dodaj nowy produkt</h2>
                <form className="input-form" onSubmit={handleAddProduct}>
                    <label>Nazwa</label>
                    <input value={productName} onChange={e => setProductName(e.target.value)}/>
                    <label>Cena (zł)</label>
                    <input value={productPrice} onChange={e => setProductPrice(e.target.value.replace(/[a-zA-Z<>?/.;:'"\\|\]}[{=+\-_)(*&^%$#@!£§~`\s]/g,''))}/>
                    <button disabled={isInvalid}>Dodaj</button>
                </form>
            </section>
            <section className="list-of-products box">
                <h2>Lista produktów</h2>
                <article className="list-header">
                    <span className="product-name">Nazwa</span>
                    <span className="product-price">Cena</span>
                    <span className="product-stock">Ilość w magazynie</span>
                </article>
                <ul className="">
                    {listOfProducts.map(e=>
                        <li className="products-list" key={e.id}>
                            <span className="product-name">{e.name}</span>
                            <span className="product-price">{e.price} zł</span>
                            <span className="product-stock">{e.stock} szt</span>
                        </li>)}
                </ul>
            </section>
        </main>
    )
};

export default Products;