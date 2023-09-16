import React, { useState } from 'react';
import {writeToDatabase} from '../idb';
import {Button, Form, Stack} from "react-bootstrap";
import {CATEGORIES} from "../Consts/Categories";


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
        <Stack direction={"horizontal"} gap={2} className={"mb-2"}>
            <div>
                <h2 className={"me-auto"}>Add New Expense</h2>
                <Form onSubmit={handleSubmit}>
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
                            {CATEGORIES.map((categoryOption) => (
                                <option key={categoryOption} value={categoryOption}>
                                    {categoryOption}
                                </option>
                            ))}
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
                    <Button type="submit" variant={"primary"}>Add Cost</Button>
                </Form>
            </div>
        </Stack>
    );
}
