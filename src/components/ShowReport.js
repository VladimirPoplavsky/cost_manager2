import React, { useEffect, useState } from 'react';
import expenseDB from '../idb.js';

function readFromDatabase() {
    return expenseDB.then(async (db) => {
        const tx = db.transaction('myExpenses', 'readonly');
        const store = tx.objectStore('myExpenses');

        // Retrieve data from the store
        const data = await store.getAll();

        await tx.done;
        return data;
    });
}

function DisplayData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        readFromDatabase().then((result) => {
            setData(result);
        });
    }, []);

    return (
        <div>
            <h2>Data from the Database:</h2>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.sum}, {item.date}, {item.category}, {item.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayData;
