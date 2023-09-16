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
        const tx = db.transaction('myExpenses', 'readwrite');
        const store = tx.objectStore('myExpenses');

        await store.add(data);

        await tx.done;
    });
}

export function readFromDatabase() {
    return idb.then(async (db) => {
        const tx = db.transaction('myExpenses', 'readonly');
        const store = tx.objectStore('myExpenses');

        // Retrieve data from the store
        const data = await store.getAll();

        await tx.done;
        return data;
    });
}

export default idb;
