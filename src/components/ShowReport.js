import React, {useState} from 'react';
import {readFromDatabase} from '../idb.js';
import ReportList from "./ReportList";


function DisplayData() {
    const [data, setData] = useState([]);
    // State to store the selected year and month
    const [selectedDate, setSelectedDate] = useState('');
    const [showReport, setShowReport] = useState(false); // Track whether the button is clicked

    const dataToDisplay = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].date.substring(0, 7) === selectedDate) {
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
                <ReportList dataToDisplay={dataToDisplay} moreData={[1, 2, 3, 4, 5]}></ReportList>
            )}
        </div>
    );
}

export default DisplayData;
