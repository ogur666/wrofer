import React, {useEffect, useState} from 'react';
import { DataGrid, GridColumn, NumberBox, ComboBox } from 'rc-easyui';
import firebase from 'firebase/app';
import 'firebase/firestore';
import AddMove from "./AddMove";

const  Stock = () => {
    const [data, setData] = useState([]);
    const db =firebase.firestore();
    // const [operators, setOperators] = useState(["nofilter", "equal", "notequal", "less", "greater"]);
    // const [status, setStatus] = useState([
    //     { value: null, text: "All" },
    //     { value: "P", text: "P" },
    //     { value: "N", text: "N" }
    // ]);
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

     return (
        <main className="main-container">
            <section className="stock-table box">
            <AddMove />
                <DataGrid filterable data={data} columnResizing>
                    <GridColumn field="date" title="Data" width="6%" sortable></GridColumn>
                    <GridColumn field="name" title="Nazwa produktu" width="25%" sortable></GridColumn>
                    <GridColumn field="quantity" title="Ilość" width="5%" sortable
                                // align="right"
                                // filterOperators={operators}
                                // filter={() => <NumberBox></NumberBox>}
                    />
                    <GridColumn field="typeOfMove" title="Typ ruchu" width="10%" sortable
                                // align="right"
                                // filterOperators={operators}
                                // filter={() => <NumberBox></NumberBox>}
                    />
                    <GridColumn field="seller" title="Handlowiec" width="15%" sortable></GridColumn>
                    <GridColumn field="notes" title="Uwagi" width="16%" sortable></GridColumn>
                    {/*<GridColumn field="confirm" title="Zatwierdzenie" width="7%"*/}
                    {/*            // align="center"*/}
                    {/*            // filter={() => (*/}
                    {/*            //     <ComboBox*/}
                    {/*            //         data={status}*/}
                    {/*            //         editable={false}*/}
                    {/*            //         inputStyle={{ textAlign: 'center' }}*/}
                    {/*            //     />*/}
                    {/*            // )}*/}
                    {/*// />*/}
                </DataGrid>
            </section>
        </main>
    );
};

export default Stock;