import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { DataGrid, GridColumn } from 'rc-easyui';
import AddNewClient from "./AddNewClient";

const Clients = () => {
    const db = firebase.firestore();
    const [data, setData] = useState([]);

    useEffect(()=> {
        db.collection('clients').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    setData(prevState => [...prevState, doc.data()])
                })
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
    },[db]);

    const refreshList = () => {
        setData([]);
        db.collection('clients').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    setData(prevState => [...prevState, doc.data()])
                })
            })
            .catch((err) => {
                console.log('Błąd bazy danych: ', err);
            });
    };


    return (
        <main className="main-container">
            <section className="stock-table box animate">
                <AddNewClient onClick={refreshList}/>
                <DataGrid filterable data={data} columnResizing>
                    <GridColumn field="shortName" title="Nazwa" width="20%" sortable/>
                    <GridColumn field="city" title="Miejscowość" width="10%" sortable/>
                    <GridColumn field="street" title="Adres" width="15%" sortable/>
                    <GridColumn field="telephoneNr" title="Nr telefonu" width="10%" sortable/>
                    <GridColumn field="email" title="E-mail" width="10%" sortable/>
                    <GridColumn field="NIP" title="NIP" width="10%" sortable/>
                    <GridColumn field="seller" title="Handlowiec" width="16%" sortable/>
                </DataGrid>
            </section>
        </main>
    )
};

export default Clients;