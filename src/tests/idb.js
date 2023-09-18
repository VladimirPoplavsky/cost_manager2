/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

const idb = {
    openCostsDB: async (dbName, version) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create an database 'costs' if it doesn't exist.
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;

                // Resolve the promise with an object  provides database operations.
                resolve({
                    // add a cost to the database.
                    addCost: async (costData) => {
                        return new Promise((resolve, reject) => {
                            // Start a new transaction in 'readwrite' mode to modify data.
                            const transaction = db.transaction(['costs'], 'readwrite');
                            const store = transaction.objectStore('costs');
                            const request = store.add(costData);

                            transaction.oncomplete = () => {
                                resolve(request.result); // Resolve with the result of the 'add' operation.
                            };

                            transaction.onerror = () => {
                                reject('Failed to add cost to the database.');
                            };
                        });
                    },
                });
            };

            request.onerror = () => {
                reject('Failed to open the database.');
            };
        });
    },
};

