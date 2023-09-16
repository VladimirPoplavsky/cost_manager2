import React, { useState } from 'react';
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
    // State to store the selected year and month
    const [selectedDate, setSelectedDate] = useState('');
    const [showReport, setShowReport] = useState(false); // Track whether the button is clicked

    const dataToDisplay = [];

    for (let i = 0; i < data.length; i++) {
        if(data[i].date.substring(0, 7) === selectedDate){
            dataToDisplay.push(data[i]);
        }
    }

    // Event handler for the input change
    const handleDateChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDate(selectedValue);
    };

    // Function to handle the "Show Report" button click
    const handleShowReport = () => {
        readFromDatabase().then((result) => {
            setData(result);
            setShowReport(true); // Set showReport to true when the button is clicked
        });
    };

    return (
        <div>
            <h2>Create Report:</h2>
            <label htmlFor="monthreport">Select period:</label>
            <input
                type="month"
                id="monthreport"
                name="report"
                value={selectedDate}
                onChange={handleDateChange}
            />
            <button type="button" onClick={handleShowReport}>
                Show Report
            </button>
            {showReport && ( // Display data only if showReport is true
                <ul>
                    {dataToDisplay.map((item) => (
                        <li key={item.id}>
                            {item.sum}, {item.date}, {item.category}, {item.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DisplayData;
