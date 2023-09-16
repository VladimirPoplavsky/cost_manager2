import React, {useState} from 'react';
import {readFromDatabase} from '../idb.js';
import ReportList from './ReportList';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import TotalExpenses from "./TotalExpenses";

function ShowReport() {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [periodSelected, setPeriodSelected] = useState(false);

    const dataToDisplay = [];

    // When page is loaded and specific month and year not selected we will show all expenses from database
    if (periodSelected === false) {
        readFromDatabase().then((result) => {
            setData(result);
        });
        for (let i = 0; i < data.length; i++) {
            dataToDisplay.push(data[i]);
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].date.substring(0, 7) === selectedDate) {
                dataToDisplay.push(data[i]);
            }
        }
    }

    const handleDateChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDate(selectedValue);
    };

    // when user selects period to report - set setPeriodSelected = true and display only specific month report
    const handleShowReport = () => {
        readFromDatabase().then((result) => {
            setData(result);
            setPeriodSelected(true);
        });
    };

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Col md={6}>
                    <h2 className={'text-center'}>Expenses:</h2>
                    <TotalExpenses records={data}></TotalExpenses>
                    <Form.Group className={'my-2'} controlId='monthreport'>
                        <Form.Label>Select period:</Form.Label>
                        <Form.Control
                            type='month'
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Form.Group>
                    <div className={"text-center mb-4"}>
                        <Button
                            type='button'
                            variant='info'
                            onClick={handleShowReport}
                        >
                            Apply
                        </Button>
                    </div>
                    <ReportList
                        dataToDisplay={dataToDisplay}
                    ></ReportList>
                </Col>
            </Row>
        </Container>
    );
}

export default ShowReport;
