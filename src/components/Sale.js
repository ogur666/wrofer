import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { DataGrid, GridColumn } from 'rc-easyui';
import AddNewSale from "./AddNewSale";
const Sale = () => {
    const db = firebase.firestore();
    const [data, setData] = useState([]);

    useEffect(()=> {
        db.collection('sales').get()
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
        db.collection('sales').get()
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
            <section className="stock-table sale-table box">
                <AddNewSale onClick={refreshList}/>
                <DataGrid filterable data={data} columnResizing>
                    <GridColumn field="id" title="Nr transakcji" width="80px" sortable/>
                    <GridColumn field="date" title="Data" width="90px" sortable/>
                    <GridColumn field="product" title="Nazwa artykułu" width="160px" sortable/>
                    <GridColumn field="quantity" title="ilość sprzedana" width="90px" sortable/>
                    <GridColumn field="sellType" title="Typ sprzedaży" width="90px" sortable/>
                    <GridColumn field="payment" title="Płatność" width="100px" sortable/>
                    <GridColumn field="dateOfPayment" title="Termin płatności" width="90px" sortable/>
                    <GridColumn field="docType" title="Typ dokumentu" width="90px" sortable/>
                    <GridColumn field="docNr" title="Nr dokumentu" width="90px" sortable/>
                    <GridColumn field="client" title="Klient" width="150px" sortable/>
                    <GridColumn field="comments" title="Uwagi" width="120px" sortable/>
                    <GridColumn field="commentsToSellers" title="Uwagi do handlowców" width="120px" sortable/>
                    <GridColumn field="net1pc" title="Cena netto 1 szt" width="80px" sortable/>
                    <GridColumn field="vat1pc" title="VAT 1 szt" width="80px" sortable/>
                    <GridColumn field="netAll" title="Wartość netto całość" width="80px" sortable/>
                    <GridColumn field="grossAll" title="Wartość brutto całość" width="80px" sortable/>
                    <GridColumn field="billedCustomer" title="Czy klient rozliczony" width="80px" sortable/>
                    <GridColumn field="notes" title="Notatki" width="120px" sortable/>
                </DataGrid>
            </section>
        </main>
    );
};

export default Sale;