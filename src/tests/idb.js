const idb = {
    openCostsDB: async (dbName, version) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, version);

            // This event is triggered when the database needs to be upgraded.
            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create an object store called 'costs' if it doesn't exist.
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
                }
            };

            // If the database is successfully opened.
            request.onsuccess = (event) => {
                const db = event.target.result;

                // Resolve the promise with an object  provides database operations.
                resolve({
                    // add a cost to the 'costs' object store.
                    addCost: async (costData) => {
                        return new Promise((resolve, reject) => {
                            // Start a new transaction in 'readwrite' mode to modify data.
                            const transaction = db.transaction(['costs'], 'readwrite');
                            const store = transaction.objectStore('costs');
                            const request = store.add(costData);

                            // If transaction is successfully completed.
                            transaction.oncomplete = () => {
                                resolve(request.result); // Resolve with the result of the 'add' operation.
                            };

                            // If there's an error during the transaction.
                            transaction.onerror = () => {
                                reject('Failed to add cost to the database.');
                            };
                        });
                    },
                });
            };

            // If there is error opening the database.
            request.onerror = () => {
                reject('Failed to open the database.');
            };
        });
    },
};

