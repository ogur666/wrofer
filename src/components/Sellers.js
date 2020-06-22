import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Sellers = () => {
    const db = firebase.firestore();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [array, setArray] = useState([]);

    useEffect(()=>{
        db.collection('users').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.data());
                    setArray((prevState => [...prevState, doc.data().firstname]));
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
    },[])

    // const showUsers = () => {
    //     return (
    //
    //     )
    // };
    // Add a new document with a generated id.
    let addDoc = () => {
        db.collection('users').add({
            firstname: 'Paweł',
            lastname: 'Kowalski'
        }).then(ref => {
            console.log('Added document with ID: ', ref.id);
            setArray([...array, "Paweł"])
        });
    };


    const Handlowcy = () => {
        setArray([]);
        db.collection('users').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.data());
                    setArray((prevState => [...prevState, doc.data().firstname]));
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
    };

    return (
        <main>
            <div>
                {array.map((e,i)=><li key={i}>{e}</li> )}
            </div>
            <form>
                <input/>
                <input/>
            </form>
            <button onClick={Handlowcy}>Kliknij</button>
            <button onClick={addDoc}>Dodaj</button>
        </main>
    )
};

export default Sellers;