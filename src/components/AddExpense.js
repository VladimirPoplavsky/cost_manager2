import React, { useState } from 'react';
import expenseDB from '../idb';




function writeToDatabase(data) {
    expenseDB.then(async (db) => {
        const tx = db.transaction('myExpenses', 'readwrite');
        const store = tx.objectStore('myExpenses');

        await store.add(data);

        await tx.done;
    });
}


export default function AddExpense() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const data = {sum, category, description, date};

    const handleSubmit = async (e) => {
        e.preventDefault();


        const newCost = {
            sum: parseFloat(sum),
            category,
            description,
            date,
        };

        try {
            setSum('');
            setCategory('FOOD');
            setDescription('');
            setDate(new Date().toISOString().split('T')[0]); // Reset date to today after submission
        } catch (error) {
            console.error('Error adding cost:', error);
        }
        writeToDatabase(data)
    };

    return (
        <div>
            <h2>Add New Cost</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Sum:</label>
                    <input
                        type="number"
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="FOOD">FOOD</option>
                        <option value="HEALTH">HEALTH</option>
                        <option value="EDUCATION">EDUCATION</option>
                        <option value="TRAVEL">TRAVEL</option>
                        <option value="HOUSING">HOUSING</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Add Cost</button>
            </form>
        </div>
    );
}
