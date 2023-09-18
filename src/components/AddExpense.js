/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

import React, { useState } from 'react';
import { writeToDatabase } from '../idb';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { CATEGORIES } from '../Consts/Categories';

export default function AddExpense() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const data = { sum, category, description, date };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset state values to their original state
        try {
            setSum('');
            setCategory('FOOD');
            setDescription('');
            /*new Date() - Creates a new Date object
            representing the current date and time at the time this function is called.

            .toISOString() - Converts a Date object to a string in ISO 8601 format.
             This format looks like "2023-09-18T14:30:00.000Z".
            */
            setDate(new Date().toISOString().split('T')[0]);
            writeToDatabase(data);
        } catch (error) {
            console.error('Error adding cost:', error);
        }
    };

    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col md={6}>
                    <div className={"my-4 text-center"}>
                        <h2>Add New Expense</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId={"sum"}>
                                <Form.Label>Sum:</Form.Label>
                                <Form.Control
                                    type={"number"}
                                    value={sum}
                                    onChange={(e) => setSum(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={"category"}>
                                <Form.Label>Category:</Form.Label>
                                <Form.Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {CATEGORIES.map((categoryOption) => (
                                        <option key={categoryOption} value={categoryOption}>
                                            {categoryOption}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId={"date"}>
                                <Form.Label>Date:</Form.Label>
                                <Form.Control
                                    type={"date"}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={"description"}>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <div className={"text-center"}>
                                <Button variant={"info"} type={"submit"}>
                                    Add Cost
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
