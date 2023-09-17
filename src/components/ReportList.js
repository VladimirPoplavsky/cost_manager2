import React from 'react';
import { Card } from 'react-bootstrap';

export default function ReportList(props) {
    return (
        <Card>
            <Card.Header as="h5">Expense Report</Card.Header>
            <Card.Body>
                <ul>
                    {props.dataToDisplay.map((item) => (
                        <ul key={item.id}>
                            <strong>Date:</strong> {item.date}<br />
                            <strong>Sum:</strong> ₪{item.sum}<br />
                            <strong>Category:</strong> {item.category}<br />
                            <strong>Description:</strong> {item.description}
                            <hr/>
                        </ul>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
}
