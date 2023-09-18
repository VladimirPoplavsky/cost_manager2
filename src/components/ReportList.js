/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

import React from 'react';
import { Card } from 'react-bootstrap';

export default function ReportList(props) {
    return (
        <Card>
            <Card.Header as={"h5"}>Expense Report</Card.Header>
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
