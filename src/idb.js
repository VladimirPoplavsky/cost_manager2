/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

import { openDB } from 'idb';

const dbName = 'expenses';

const idb = openDB(dbName, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('myExpenses')) {
            db.createObjectStore('myExpenses', { keyPath: 'id', autoIncrement: true });
        }
    },
});

export function writeToDatabase(data) {
    idb.then(async (db) => {
        //create transaction used to perform database operations
        const tx = db.transaction('myExpenses', 'readwrite');
        const store = tx.objectStore('myExpenses');

        await store.add(data);
        //Waiting for the transaction to complete
        await tx.done;
    });
}

export function readFromDatabase() {
    return idb.then(async (db) => {
        //create transaction used to perform database operations in 'readonly' mode
        const tx = db.transaction('myExpenses', 'readonly');
        const store = tx.objectStore('myExpenses');

        // we read all the data to display all expenses before user select specific period
        const data = await store.getAll();

        await tx.done;
        //Waiting for the transaction to complete
        return data;
    });
}

export default idb;
