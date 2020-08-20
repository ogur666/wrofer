import React, {useEffect, useState} from 'react';
import { DataGrid, GridColumn } from 'rc-easyui';
import firebase from 'firebase/app';
import 'firebase/firestore';
import AddMove from "./AddMove";

const  Stock = () => {
    const [data, setData] = useState([]);
    const db =firebase.firestore();

    useEffect(()=> {
        db.collection('stock').get()
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
        db.collection('stock').get()
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
            <section className="stock-table box">
            <AddMove onClick={refreshList}/>
                <DataGrid filterable data={data} columnResizing>
                    <GridColumn field="date" title="Data" width="6%" sortable/>
                    <GridColumn field="name" title="Nazwa produktu" width="25%" sortable/>
                    <GridColumn field="quantity" title="Ilość" width="5%" sortable />
                    <GridColumn field="typeOfMove" title="Typ ruchu" width="10%" sortable />
                    <GridColumn field="seller" title="Przedstawiciel" width="15%" sortable/>
                    <GridColumn field="notes" title="Uwagi" width="16%" sortable/>
                </DataGrid>
            </section>
        </main>
    );
};

export default Stock;