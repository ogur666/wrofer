import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import {Form} from "react-bootstrap";

const Sellers = () => {
    const db = firebase.firestore();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    // const [mail, setMail] = useState("");
    const [listOfUsers, setListOfUsers] = useState([]);
    // const [isAdmin, setAdmin] = useState(false);
    // const [password, setPassword] = useState("");
    // const [password2, setPassword2] = useState("");
    // const [error, setError] = useState("");
    // const [isVisible, setVisible] = useState("");

    // const createUser = firebase.functions().httpsCallable('AddUser');



    useEffect(()=>{
        db.collection('users').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setListOfUsers(prevState => [...prevState, doc.data()]);
                });
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
    },[db]);

    const addUser = (e) => {
        e.preventDefault();
        const newUser = {
            firstname: name,
            lastname: surname,
            // email: mail,
            // admin: isAdmin
        };
        db.collection('users')
            .add(newUser)
            .catch(error=>console.log(error));
        setListOfUsers(prevState => [...prevState, newUser])
        // createUser({ mail, password })
        //     .then(console.log)
        //     .catch(console.error);

        // firebase.auth()
        //     .createUserWithEmailAndPassword(mail, password)
        //     .then(()=>{
        //         db.collection('users')
        //             .add(newUser)
        //             .catch(error=>console.log(error));
        //         setListOfUsers(prevState => [...prevState, newUser]);
        //     })
        //     .catch(error => setError(error.message));
        setName("");
        setSurname("");
        // setMail("");
        // setPassword("");
        // setPassword2("");
        // setTimeout(() => {
        //     setVisible("none");
        // },3000);
    };

    const isInvalid =
        // password !== password2 ||
        // password === '' ||
        // mail === '' ||
        name === '';

    return (
        <main className="main-container">
            <section className="box">
                <h2>Dodaj nowego handlowca</h2>
                <form className="input-form" onSubmit={addUser}>
                    <input type="text" value={name} placeholder="imię" onChange={event => setName(event.target.value)}/>
                    <input type="text" value={surname} placeholder="nazwisko" onChange={event => setSurname(event.target.value)}/><br/>
                    {/*<input type="email" value={mail} placeholder="e-mail" onChange={event => setMail(event.target.value)}/><br/>*/}
                    {/*<input type="password" value={password} placeholder="hasło" onChange={event => setPassword(event.target.value)}/>*/}
                    {/*<input type="password" value={password2} placeholder="wpisz ponownie hasło" onChange={event => setPassword2(event.target.value)}/>*/}
                    {/*<Form.Check type="switch" id="custom-switch" label=" Administrator" disabled={isInvalid} onClick={()=> setAdmin(!isAdmin)}/>*/}
                    <button disabled={isInvalid}>Dodaj</button>
                </form>
                {/*<p className="error-message"><span style={{display:isVisible}}>{error}</span></p>*/}
            </section>
            <section className="list-of-products box">
                <h2>Lista użytkowników</h2>
                <article className="list-header">
                    <span className="product-name">Imię</span>
                    <span className="product-price">Nazwisko</span>
                    {/*<span className="product-stock">E-mail</span>*/}
                </article>
                <ul>
                    {listOfUsers.map((e,i)=>
                        <li className="product-list" key={i}>
                            <span className="product-name">{e.firstname}</span>
                            <span className="product-price">{e.lastname}</span>
                            {/*<span>{e.email}</span>*/}
                            {/*<span>{e.admin === true? "Admin" : "User"}</span>*/}
                        </li> )}
                </ul>
            </section>

        </main>
    )
};

export default Sellers;