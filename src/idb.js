import { openDB } from 'idb';

const dbName = 'expenses';

const expenseDB = openDB(dbName, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('myExpenses')) {
            db.createObjectStore('myExpenses', { keyPath: 'id', autoIncrement: true });
        }
    },
});

export default expenseDB;
